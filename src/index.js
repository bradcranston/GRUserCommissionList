//import { data } from "./data.js";

window.loadData = (json) => {
  const data = JSON.parse(json);

  let table = new DataTable("#table", {
    data: data,
    paging: false,
    fixedHeader: true,
    scrollCollapse: true,
    scrollY: "450px",
    layout: {
      topStart: {
        buttons: [
          {
            extend: "searchPanes",
            config: {
              cascadePanes: true,
              collapse: false,
            },
          },
        ],
      },
    },
    columns: [
      {
        data: "fieldData.__kp_Invoice",
        title: "Invoice #",
      },
      {
        data: "fieldData.Status",
        title: "Status",
      },
      {
        data: "fieldData.LocationName",
        title: "Location",
      },

      {
        data: "fieldData.Date",
        title: "Date",
        render: DataTable.render.date(),
      },

      {
        data: "fieldData.InvoiceTotal",
        title: "Amount",
        render: DataTable.render.number(null, null, 2, "$"),

      },{
        data: "fieldData.BalanceDue",
        title: "Balance",
        render: DataTable.render.number(null, null, 2, "$"),

      }
    ],
    columnDefs: [ {
      data: null,
      defaultContent: '<button>Click!</button>',
      targets: 8
  },
      {
        searchPanes: {
          show: true,
        },
        targets: [1, 2],
      },
      {
        searchPanes: {
          show: false,
        },
        targets: [0,3,],
      },
    ],
  });

  table.on('click', 'button', function (e) {
    let data = table.row(e.target.closest('tr')).data();
 
    alert(data[0] + "'s salary is: " + data[5]);
});

};

window.callFM = function (result) {
  FileMaker.PerformScript("USR_U003 -  wv_runScript", JSON.stringify(result));
};

$(".dataTable").on("click", "tbody tr", function () {
  let build = {
    data: table.row(this).data(),
    table: "invoice",
  };
  callFM(build);
});
