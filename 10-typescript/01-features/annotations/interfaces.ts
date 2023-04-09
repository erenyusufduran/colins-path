// Interfaces
// Creates a new type, describing the property names and value types of an object

interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const printVehicle = (vehicle: { name: string; year: Date; broken: boolean }): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken: ${vehicle.broken}`);
};

const printVehicleV2 = (vehicle: Vehicle): void => {
  console.log(vehicle.summary());
};
