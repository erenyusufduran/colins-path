# Setting Up the Network Configuration and Policies

Members need to include the initial set of **organizations** that will be part of the network. Examples are _ACME AIR_ and _Budget_.

Each of these organization will have **anchor peers**. So those need to be identified as part of the network setup.

**Ordering service** as the administration point for the network. As a result, desicions need to be made around how the administration will be carried out using the ordering service.

Initial set of **application channels** need to be described. These channels will be used by the various members for carrying out the transactions.

Then there is a set of **client or applications** that need to be described in the network configuration.

**Policies** for he network are defined as part of the network configuration. These policies are defined at _multiple level_.

- Organization Level
- Ordering Service Level
- Channels Level

Policies defined who can modify the configuration elements and also how those modifications will be carried out.

---

So the initial set of configuration elements along with the policies are encoded in the `configtx.yaml`file. Then configtx file then used as input to the `configtxgen tool` that generates the **Genesis Block**, that contains the initial configuration for the network.

![](./initial-config.jpeg)

The genesis block, along with the configuration elements and the policies is **stored in ledger**.

- Also the _changes are consensus driven and they are enforced by the policies contained in the Genesis Block_.
  - Consensus driven model leades to **transparency**.
  - High level of **trust** among the members.
  - **Built in audit for config changes**.

_Even **Policies** can change over a period of time_.

---

The configuration for the network and the channels is updated by way of a special transaction called the **Config Update Transactions**.

- Config update tx are submitted for making changes.

Administrators submit these config update transactions to the network. These transactions go through the same process as the normal transactions, except they are executed by the configuration system chaincode. Once the config transaction has been validated, it is delived by the orderer in a block or config block. _This is a special block that has only **one transaction and that is the config update transaction**._

---

Orderer system channel is a special channel that gets created as part of the network initialization. All of the peers and the orderers in the network are aware of the orderer system channel by way of the Genesis Block.

- Orderers and peers use the orderer system for initialization. That is the reason Orderer System Channel also **refers to as Bootstrap Channel**.
- Network configuration held in the orderer system channel ledger.
- Primary responsibilities of the orderer system channel is to orchestrate the creation of **new channels**. These are application channels.

## Inspecting the latest channel config

There are three steps;

1. _Fetch the latest **Config Block**._
2. Translate the block to **JSON**.
3. Extract the _config_ using ./jq

---

0.  - Initialize orderer and peer.
1.  - Create a temp folder under the `peer/simple-two-org/temp`
    - `peer channel fetch config -c acmechannel -o localhost:7050 ./temp/config_block.pb`
2.  - `configtxlator proto_decode --input ./temp/config_block.pb --type common.Block > ./temp/config_block.json`
3.  - We need channel configuration path.
    - `export JQ_CONFIG_PATH=.data.data[0].payload.data.config.channel_group.groups.Orderer.values`
    - `cat ./temp/config_block.json | jq $JQ_CONFIG_PATH`

## Policies

Hyperledger Fabric **Policies** embodies the rules for _Access | Updates_ to the _Network & Channel_ configurations.

The initial set of policies are defined by the consortium members, and this mechanism provides a very fine griend access control over the various configuration elements of the network.

These policies are encoded in the `configtx.yaml` file. Then eventually become part of the _Genesis Block_. Then genesis block control what can be changed, who can changed, and how the changes will be applied to the various configuration elements.

- What question for
  - Network configuration
  - Channel configuration
- Who question for
  - Administrator
  - Member
  - Application | Client
- How question for
  - Rules applied to the transactions
    - Single Org driven
    - Multi Org driven

### Policy Examples

- Addition of anchor peer says `any admin from owner org`
- Update the orderer system channel is a risky activity rule may be `majority admin from all org`
- Adding a new member `any admin from any org`
- Remove existing member `majority admin from all org`

Rules are expressed as Boolean expressions in terms of the Principles.

Principles refers to the _signers role in the member organization_.

There are four standard policies; MSPId.Role

- admin
- member
- client
- peer

---

Policies are defined in the appropriate section in `configtx.yaml` file.

- Organizations: Organization level policies.
- Orderer:
- Application:
- Channel:

Defined as hierarchies

- `/Channel` Top level change - Extremely Restrictive
- `/Channel/Orderer` Orderer config changes - Very Restrictive
- `Channel/Application` App channel changes - Restrictive
- `Channel/Application/<OrgID> | Channel/Orderer/<OrgID>` Org level change

Policy names are defined as `/Channel/Application/<OrgID>/<PolicyName>`

Type of the policy can be signature or implicit meta.

### Signature

- Rules are boolean expressions
  - Result: true | false
- Applicable at all levels
- Functions: OR() AND()

### Implicit Meta

- Rules refer to other policies
  - Result: Aggregated from referred policies
- Applicable for channel configuration
  - Not applicable for Org level policies
- Keywords: ANY ALL MAJORITY

## Policy Encoding in Genesis

### Policies Testing Setup

Under the `setup/config/multi-org` section there are policies subfolders.

- In this folder `./clean.sh all`, `./init.sh`, `./block-json.sh`
  - If you execute script without any argument, it generate JSON represantation of Genesis Block.
  - If you provide group parameter, it apply JQ
  - If you provide subpath, it shows easier

Policies are organized as hierarchy of groups. Then there are policies and values. Each of the policy has a type and a value.

The type is set **1 for Signature** and **3 for Meta Implicit** policy.

## Signature Policy Type

Rules are created by using functions.

- **OR(...)** - Logical _OR_ operation applied to the arguments.
  - Any member of Org1 - **OR(`Org1MSP.member`)**
  - An admin of Org1 _OR_ a member of Org2 **OR(`Org1MSP.admin`, `Org2MSP.member`)**
- **AND(..)** - Logical _AND_
  - An admin of Org1 _AND_ an admin of Org2 **AND(`Org1MSP.admin`,`Org2MSP.admin`)**
- **OUFOF(...)** - Where a number is provided as first argument.
  - If the specified number of signatures are there out of the principles specified from second arguments onward.
  - If you have three organizations specified in the out of function and the first argument is set to one, then this policy will be satisfied only if one out of the three organizations specified in the function have signed the config update transaction.
  - 1 out of Org1 admin, Org2 admin **OUTOF(1, `Org1MSP.admin`, `Org2MSP.admin`)**
  - Both admins from Org1 admin, Org2 admin **OUTOF(2, `Org1MSP.admin`, `Org2MSP.admin`)**

Signature policies are very flexible in terms of rule creation. You can create complex rules.

- An admin of Org1 _OR_ Org2 + A Member of Org3
  - **AND(OR(`Org1MSP.admin`, `Org2.admin`), OR(`Org3MSP.member`))**

## Exercise: Manually Create the Airline Channel with Different Identities

### Hypothetical Situation

- Start with `policy.0/configtx.yaml`
- Update the **Orderer** Org Admins policy
  - `Only Orderer Admin can take Admin actions`
- Update the **Acme** Org Admins policy
  - `Acme Admin Or Orderer Org Admin`
- Update the **Budget** Org Admins policy
  - `Both Budget Admin, Orderer Org Admin`

1. Setup the Policies at Org Level as per requirements
2. Initialize the Orderer
3. Verify the setup by inspecting the _JSON_.

## Implicit Meta Policy Type

- Helps in avoiding duplication of policies.
- No need to update when new orgs are added.

---

- _ANY_ - Requires any sub policy to be satisfied
- _ALL_ - Requires all sub policies to be satisfied
- _MAJORITY_ - Requires a strict majority of sub policy to be satisfied

The order level policy is a consensus driven decision point. The values that can be changed at the orderer level are `BatchSize, BatchTimeout, ChannelRestriction, ConsensusType`. No one administrator should be in control of changes to these values.

Majority of Orderer Org Admins MUST agree.

### Access Control

Under the Orderer policies, readers you will find that the rule says that any leader from the orderer organizations can can read the channel. So rule is in here `ANY of /Channel/Orderer/*/Readers`. Look at `policy.3`

## Recouse Level Access Control List (ACLs)

Access Control Lists are used for managing access to resources by way of Policies.

Resources in the contrext of ACL's are,

- The event sources
- The functions exposed by the system chaincode
  - Iscc / Get instantiated chaincode
  - Qscc / Get chain info
- The functions exposed by user chaincode are also considered as the resources.

Users access these resources using the SDK and access control is applied to who can access these resources by way of policies. What type of policies using?

- **You can use the signature policies**, which case you will need to provide the boolean expression that will be used for evaluating whether the access is granted to the resources or not.
- **It can be implicit metapolicy**, in which case the policy used from the ACL will refer to an existing policy.

---

- `event/Block`, `event/FilteredBlock` - Receive block events
- `Iscc/GetInstantiatedChaincodes` - Get list of instantiated chaincode
  - `peer chaincode list --instantiated`
- `qscc/GetChainInfo` - Get list of installed chaincode
  - `peer chaincode list --installed`
- `peer/Propose` - Submit transaction proposal
  - `peer chaincode invoke`

ACL's are defined under the _ACL subsection_ under the Application section of configtx.yaml file. `./block-json.sh acls`

Access control for the resources may be overridden by way of defining the `resource: policy specification` under the ACL subsection. These policy specification may be reference to a existing policy or you may craete new custom policies under the policies section.

---

### Exercise: Execute the peer chaincode list commands with different identities

Launch Terminal#1

1. Initialize & Launch the Orderer ./clean.sh all ./init.sh (orderer/multi-org)
2. Launch orderer ./launch.sh

Launch Terminal#2

1. Clean the peer setup ./clean.sh (peer/multi-org)
2. Setup the environmemnt source set-env.sh acme admin
3. Create the airlinechannel ./create-airline-channel.sh
4. Launch peer for acme ./launch-peer.sh acme
5. Join airlinechannel for acme ./join-airline-channel.sh acme
6. Set the identity admin . ./set-env.sh acme admin

7. Check the installed chaincode peer chaincode list --installed -C airlinechannel
8. Check the instantiated chaincode peer chaincode list --instantiated -C airlinechannel
9. Check the joined channels peer channel list

10. Set the identity User1 . ./set-env.sh acme User1
11. Repeat steps 7, 8 & 9

---

To upper configtx.yaml do some changes.

1. Add a new custom policy
   - ANY admin can access
2. Override the default ACLs for appropriate resource
   - Give StrictAdminPolicy
3. Validate the setup
   - Initialize & Launch the Orderer
   - Create the airline channel
     - `./create-airline-channel.sh`
   - Launch peer for acme
     - `./launch-peer.sh acme`
   - Join airline channel
     - `./join-airline-channel.sh acme`
   - Execute commands with admin identity
     - `./set-identity.sh acme admin`
       - `peer chaincode list --installed -C airlinechannel`
       - `peer chaincode list --instantiated -C airlinechannel`
   - Execute commands with User1 identity
   - `./set-identity.sh acme User1`
     - `peer chaincode list --installed -C airlinechannel`
     - `peer chaincode list --instantiated -C airlinechannel`

- `peer lifecycle chaincode --queryinstalled`

Default ACLs may be overridden.

ACLs may use custom policies.
