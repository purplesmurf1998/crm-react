const institutionalColumns = [
  {
    dataField: "portNumber",
    text: "Portfolio #",
    sort: true
  },
  {
    dataField: "portName",
    text: "Name",
    sort: true
  },
  {
    dataField: "institutional.market",
    text: "Market Segment",
    sort: true
  },
  {
    dataField: "institutional.status",
    text: "Portfolio Status",
    sort: true
  }
];

const successionColumns = [
   {
    dataField: "portNumber",
    text: "Portfolio #",
    sort: true
  },
  {
    dataField: "portName",
    text: "Name",
    sort: true
  },
  {
    dataField: "succession.clientName",
    text: "Client Name"
  },
  {
    dataField: "succession.trustRole",
    text: "NBC Role"
  }
]

export { institutionalColumns, successionColumns };
