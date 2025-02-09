const IPV4 = [
  "192.168.1.14",
  "192.168.216.129",
  "192.168.1.10",
  "192.168.137.171",
  "192.168.137.1",
  "192.168.137.176",
  "192.168.137.169",
  "192.168.191.129",
  "192.168.60.129",
  "192.168.79.167",
  "192.168.1.7",
  "192.168.0.19",
  "192.168.0.20",
  "192.168.1.11",
  "192.168.1.16",
  "192.168.166.129",
  "192.168.1.17",
  "192.168.211.129",
  "192.168.142.129",
  "192.168.1.12",
  "192.168.1.9",
  "192.168.1.8",
  "192.168.5.129",
];

const ip = (search1, search2) =>
  IPV4.filter(
    (ipp) => ipp.split(".")[2] === search1 && ipp.split(".")[3] === search2
  );

export const url = `http://${ip("137", "1")}:8090/siwc-csc/api`;
// export const url = `https://api-siwc-csc.duckdns.org/siwc-csc/api`;
