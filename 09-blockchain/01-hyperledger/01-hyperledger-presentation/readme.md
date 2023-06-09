# Hyperledger Fabric Konsensus Yapıları ve Öğeleri

1. ## Consensus

2. ## Process

3. ## Word State

   Word state kelimesi, ledger'ın mevcut değerlerini bulmak için tüm önbellek verilerini toplayan veritabanını ifade ediyor. Böylece, hesaplama yapmak yerine değerlere doğrudan erişmeyi nispeten kolaylaştırıyor.

   Ayrıca, bir veritabanı yapısına sahip olduğu için, statelerle etkileşime geçmek için birçok başka özelliğe de sahip olacağız. Gerçekte, deftere geçişler ekleyen birden fazla uygulama, durumun değerini değiştirecektir.

4. ## Block Structure

   Blok yapısının içerisinde 3 öğe bulunuyor. Bunlar:

   1. **Block Header**: Block Header, genesis bloğundan başlayan bir blok numarası içeriyor. Yeni bloklar geldiğinde de birer birer artar. Öte yandan, mevcut bir block hash adresini ve önceki bloğun hash adresini içeriyor.

   2. **Block Data**: Bu bölümde tüm işlemler sıralanıyor.

   3. **Block Metadata**: Bloğun ne zaman çıktığı, imzası, public keyi gibi birçok bilgi içeriyor.

5. ## Transaction Structure

   1. **Header**: Transaction'ın öneml metadataları yer alır, zincir sürümü gibi.

   2. **Signature**: Client'ın imzası saklanır. İşlemin geçerli olup olmadığını görmek için çok önemlidir.

   3. **Proposal**: Teklif, işlem için tüm giriş parametrelerini içerir.

   4. **Response**: State öncesi ve sonrası durumu not edilir. İşlem geçerliyse, sistem onu kullanır.

   5. **Endorsement**: Onaylanan kişiden gelen tüm imzaları bulundurur.

6. ## Private Data

   Bazı bilgilerin diğer kişilerden gizli tutulması istendiğinde, kuruluşa özel bir kanal oluşturma özelliği kazanır. Burada sadece bilgileri görebilen üyeler dahil olabilir ve diğer üyeler de dışarıda kalabilirler.

   Ancak, tüm özel kanallarda, tüm Hyperledger akıllı sözleşme versiyonunu ve diğer politikaları yürütmek için bir yönetici olması gerekir. Ayrıca, kanal dışındaki diğer katılımcıları içerebilecek herhangi bir kullanım durumuna da izin vermez.

7. ## Development
   - Go, Java, JavaScript ile geliştirme yapılabiliyor.
     - En aktif geliştirme Go diliyle yapılıyor.
     - Solidity'i de görüyoruz, fakat github hesaplarında herhangibir geliştirme göremedim.
   - State Storage CouchDB ve LevelDB'de yapılabiliyor.
   - GitHub'da en aktif olan proje fabric projesi, Sawtooth'a baktığımızda birçok dildeki son geliştirmelerinin 3, 4 yıl önce yapıldığını görüyoruz. Sadece rust ile olan geliştirmeleri en son 7 ay öncesine dayanıyor.

# Hyperledger Sawtooth

## **What is Sawtooth**

Hyperledger Sawtooth, kurumsal blockchain platformu Hyperledger altında açık kaynaklı bir blockchain projesidir. Ağlar ve dağıtılmış defter uygulamaları geliştirmek için mükemmel bir çözümdür.

Hyperledger Sawtooth belgelerine göre, aslında tüm uygulama tasarım sürecini basitleştiriyor. Uygulama alanı çekirdek sistemden tamamen ayrılmıştır. Böylece çekirdek sistemi hiçbir şekilde etkilemeden uygulamaların denenmesini kolaylaştırıyor.

Ayrıca, uygulamayı geliştirmek için herhangi bir programlama dilini de kullanabilirsiniz.

Bu platformla ilgili bir başka harika şey de oldukça modüler olmasıdır. Dahası, kuruluşun ağın genel politikası hakkında doğru kararlar almasına yardımcı olur.

> Söylemeye gerek yok, Hyperledger Sawtooth kursu çoğunlukla konsorsiyum veya benzeri ortamlar için uygundur.

Ek olarak, ihtiyaçlarınıza göre izinleri, işlem düzenlemelerini, mutabakat protokollerini ve daha fazlasını seçebileceksiniz. Yani, her türlü iş için esnek bir ortam elde ediyorsunuz.

## **Distributed Ledger Technology**

Blok zincirleri, dağıtılmış defter teknolojisi kategorisine girer. Benzer şekilde, Hyperledger Sawtooth da bu kapsama giriyor. Ağda merkezi bir otorite yok, Data tüm düğümler arasında dağıtılıyor.

Dahası, hiç kimse veritabanını değiştiremez ve ağ üzerinden yolunu kesemez. Böylece işlem eklendiğinde orda kalır.

Tüm kimliklerin işaretleri, herhangi bir yeni işlemin geçerli olduğundan emin olur. Ağ herkesi bu şekilde kontrol altında tutar.

## **Özellikleri**

- **Application Development Friendly**

Uygulama alanını kernel sisteminden ayırarak uygulama geliştirmeye daha kolay bir zemin sağlıyor. Sawtooth dökümanına göre, bu ayrımın tek amacı, uygulama katmanındaki herhangi bir yeni eklemeden hiçbir temel özelliğin etkilenmemesini sağlamak.

Ayrıca dApp'leri geliştiren uygulama katmanında olduğunuzda, bunun kaynakları kullanacağı, ancak kernelde bundan etkilenmeyeceği anlamına gelir.

Bu nedenle, burada yavaşlama veya düşük verimlilik sorunu yok.

- **Permissioning Features**

Ağa hiç kimse istediği gibi giriş yapamaz, bu yüzden kurumsal ortam için uygun. Tabii ki bunu halka açık bir ortam haline de getirebiliriz.

Örneğin, aynı teknolojiyi dahili ağ sisteminiz için ve müşteri etkileşimleri için de kullanabiliriz.

Kurumsal blockchain platformunda bu tür bir esneklik oldukça nadir. Genellikle public, ya da private bir yapı görüyoruz. Sawtooth'ta ise birazdan da anlatacağım Identity Transaction Family'leri ile platforma girebilecek düğümleri önceden seçebiliriz.

- **Private Network**

  Herkes ağda farklı bir kanal açarak, node deploy edebilir.

  Özellikle node yani düğümler için özel bir oturum oluşturacaktır. Sonuçta şirkette meraklı gözlere açık olmaması gereken birçok unsur vardır.

  Ayrıca, merkezi bir otorite olmadığı için, platformda sakladığınız hassas bilgilere kimse öylece bakamaz. Ancak unutmamalısınız ki bu private network'teki işlem değerleri artık ledger'da yer almayacaktır.

- **Execution of Parallel Transaction**

  Platformu çok kişi kullanmaya başladığında, her bir işlemin işlenmesi nispeten zorlaşır.

  Sawtooth işlemlerin yavaşlamaması için işlemleri paralel olarak yürütür. Bu da aynı anda birden fazla işlemin yürütülebileceği anlamına geliyor.

- **Modular Structure**

  Bu özellik yardımıyla geliştiriciler, istedikleri herhangi bir konsensüs algoritmasını veya istedikleri farklı bir özelliği kullanıp, kullanmamak konusunda özgürdür. Bu _plug and play_ senaryosu olarak geçiyor.

  Bir başka büyük artısı da, aynı anda birden çok mutabakatın aynı platformun birden çok bölümünde çalışabilmesi. Böylece, sektöre uyan en iyi kombinasyonu seçebiliyoruz.

## **Konsensüs Yapıları ve Öğeleri**

1. ## Event System

   Event system ile Hyperledger Sawtooth, eventlerin oluşturulmasını ve dinlenmesini destekliyor. Bu da bize şunları sağlıyor:

   1. Blockchainde meydana gelen tüm olaylara abone olmak için düğümler. Mesela yeni bir block eklendiğinde veya ağ forklandığında bunu görebiliriz.
   2. Transaction family'lerinden gelen diğer uygulamalardan haber alabiliriz.
   3. Son durumu state'te saklamadan bilgiyi kanaldaki diğer node'lara dağıtabiliriz.

   ***

2. ## Transaction Receipts

   Bu öğenin yardımıyla müşterilerin işlemleri hakkında bilgi alabiliriz, bunlar state'de tutulmazlar.

   - İşlemin geçerli olup olmadığı bilgisi,
   - İşlemin yürütülmesi sırasında hangi event'lerin olduğu,
   - İşlemin state'i nasıl değiştirdiği,
   - Herhangi bir transaction family'e ait yürütme bilgisine erişebiliriz.

   ***

3. ## Ethereum Contract Compatibility with Seth

   Sawtooth'un en iyi özelliklerinden biri, Seth kullanan Ethereum kontratlarına uyumluluğu. Bu proje ile Ethereum ile projeler arasında bir bağlantı oluşturuluyor.

   Böylece, EVM'i kullanarak akıllı sözleşmeleri dağıtabiliriz.

   Aslında, Burrow'un EVM implementasyonunu aldılar. Burrow EVM'i Sawtooth'ta da çalıştırıyorlar.

   Bu özelliğin diğer bir ana amacı, dApp'lerin ve diğer EVM kontratlarının ağa bağlanmak için yeterince kolay olmasına yardımcı olmak. Bunun için Ethereum JSON RPC API'ını kopyaladılar.

   ***

4. ## Pluggable Consensus Algorithms

   Sawtooth ile birçok konsensüs protokolü elde edilebiliyor. Bir başka güzel yanı ise aynı anda birden fazla konsensüs yürütülmesine izin veriyor olması.

   Ağı kurarken, kullanmak istenilen konsensüs seçiliyor. Sonrasında da bu değiştirilebiliyor.

   Seçilebilecek 5 farklı konsensüs var. Bunlar.

   - **Devmode**

     - Devmode daha çok test etmek için yararlıdır, basitleştirilmiş bir lider algoritması diyebiliriz. Production'da kullanılması önerilmez.

   - **pBFT**

     - Lider tabanlı bir konsensüs algoritmasıdır, zaten daha önce konuşmuştuk bu algoritmayı.

   - **PoET CFT**

     - Bir diğer adı PoET similator. Algoritmaların özgürce çalışmasına izin veren SGX türü bir simülatör ortamı var.

   - **Raft**
     - Ağda kitlenme olmaması için lider tabanlı bir konsensüs algoritmasıdır.

   ***

5. ## Sample Transaction Families

   İşletmeler genellikle sabit bir transaction süreci ararlar, çünkü bu riski büyük ölçüde sınırlayacaktır.

   Dolayısıyla, bu tür durumlar için transaction family'ler kullanılabilir, hatta işletmeler kendi modellerini de oluşturabilirler.

   Örneğin IntegerKey olarak adlandırılar ailelerden biri aslında sadece 3 tür işlem sunar.

   - Set
   - Increment
   - Decrement

   Dolayısıyla, yalnızca bu 3 parametre ile herhangi bir hata yapmak nispeten zordur.

   ### Neden Sawtooth onları İlk Etapta Tanıttı?

   Geliştiriciler, Sawtooth mimarisinde işletmelerin istedikleri çok yönlülüğü seçebileceklerinden emin olmak istediler. Yani kısacası, ağın esnekliğini genişletmeye yardımcı oldular.

   Some Facts:

   - Transaction Family oluşturmayı herhangi bir dil ile yapabilirsiniz.
   - C++, Java, JS, Go, Python, Rust için SDK'ler mevcuttur.
   - Hepsi paralel bir alanda birbirinden ayrı çalışırlar, böylece ağa alan sağlarlar.

   ### Families

   - **BlockInfo Transaction Family**

     - En yaygın özelliklerinden biri, düğümler geçiş halindeyken diğer bilgilere referans verme yeteneği sunmasıdır. Örneğin EVM'de platform aslında kısaca işlemcinin önceki blokların hash işlevine erişmesine yardımcı olan bir **BLOCKHASH** tanımlar.
     - Bu, işlemcinin yenisini buna göre hashlenmesine yardımcı olur.
     - BlockInfo aslında yapılandırılabilir tarihi bloklar hakkında herhangi bir bilgiyi saklamanın bir yolunu sunar.

   - **Identity Transaction Family**

     - Sistemdeki tüm kimliklerin yönetilmesine yardımcı olur. Herhangi bir zincir üstü izin durumunda, bir doğrulayıcı anahtar ve işlem anahtarı kesinlikle gereklidir. Ayrıca bunu yapmak için her iki tarafın da uygun kimlik doğrulama iznine sahip olması gerekir.
     - Ancak tüm bu bilgiler, yönetilmesi gerekilen bir engel haline gelir. Yine de durumu bu transaction ailesi yardımıyla yönetmek kolaydır.

   - **Validator Registry Transaction Family**

     - Tek doğrulayıcı (validator) ile, ağda çok fazla kullanıcı olduğunda sistem çökebilir. Doğrulayıcı işlem ailesi, bu konuda yardımcı olmak için ağa yeni doğrulayıcılar eklemek için bir yol sunar.

   - **Settings Transaction Family**

     - Kanalda devam eden pek çok şey var ve bunlar düzgün bir şekilde saklanırsa, blok zinciri parçalanırsa, saldırıya uğramayan ortamın tamamı bozulur.
     - Bu nedenle, Settings işlem ailesi, zincir üstü yapılandırmaların depolanmasını sağlayan bir yöntemin sürdürülmesine yardımcı olur. Yani, zincir içi ve zincir dışı konfigürasyonlar birbirini etkilemeden değişebilir.

   - **Smallbank Transaction Family**

     - Yeni bir çerçeve oluşturdunuz. Ama şimdi gerçekten nasıl performans gösterdiğini görmeniz gerekiyor. Şimdi bunu nasıl yapacaksın? Gerçekte, Smallbank işlem ailesi, kullanıcıların çerçeveyi karşılaştırmasına ve nasıl performans gösterdiğini görmesine olanak tanır.

     ***

6. ## Global State

   Bizans konsensüsünde düğümler arasındaki tüm kopyaların sağlam bir blockchain kalitesi oluşturması için ortaya çıkmıştır.

   Sawtooth bunu sürdürmek için Radix Merkle Tree kullanır. Ayrıca, aynı işlemin her doğrulayıcısında blokların doğrulanması aynı durumu ve aynı sonuçları üretir.

   Tüm işlem ailesinin işlemlerin genel durum verilerini paylaşacağından, tanımlayacağından ve yeniden kullanılacağından emin olur.

   ***

7. ## Radix Merkle Tree

   Sawtooth tüm transaction ailelerini depolamak için Radix Merkle Tree kullanıyor.

   Bloğa bağlı bir dizi geçiş için, söz konusu işlemde tek bi hash oluşturuluyor. Hash ise işlem bloğunun header'ına yerleşiyor.

   Dolayısıyla, doğrulayıcının işlemi Merkle'dan farklı bir adreste sona erdiğinde, o blok geçerli olmayacaktır. Bu şekilde tanıklara güvenmeden fikir birliğine varma eğiliminde oluyor.

   ***

8. ## Validator Network

   Ağ katmanı doğrulayıcılar içindeki iletişimi sağlamaktan sorumludur. Eş bulma, bağlantı ve mesaj işlemeyi de içerir.

   Doğrulayıcılar, her türlü gelen bağlantı için belirli bir arabirimi ve diğer bağlantı noktalarını dinlemeye başlar. Bağlantı gerçekleştiğinde, doğrulayıcılar gossip protokolüne göre mesaj alışverişi yaparlar.

   Ağın hedefi, ağ katmanını mümkün olduğunca kendi kendine idame ettirebilmek. Normalde ağğ katmanı, uygulama katmanı hakkında bir bilgi veya veriyi almaz. Bu nedenle, ağ katmanındaki yük nispeten azaltılır ve hızlıdır.

   ***

9. ## Development
   - Rust, JavaScript, Go, Python, Solidity gibi dillerle yazılabiliyor.
     - JS, Go gibi dillerdeki geliştirmeler çok eski
     - Rust geliştirmeleri daha yeni, yazılacaksa rust'a yönelmek iyi olabilir. Örneklerde de daha çok rust'ı görüyoruz.
     - Solidity ile yazılabilmesi EVM Support'u sağlıyor. Bu konuyu Seth ile sağlıyor. Daha önce Seth'den bahsetmiştik.
