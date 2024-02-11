export enum ShippingStatus {
  prePrint = "SS00",
  inPrint = "SS01",
  dispatched = "SS02",
  delivered = "SS03"
}

export enum PaymentMethod {
  card = "PM00",
  crypto = "PM01"
}

export enum PaymentStatus {
  pending = "PS00",
  completed = "PS01",
  delayed="PS02"
}
