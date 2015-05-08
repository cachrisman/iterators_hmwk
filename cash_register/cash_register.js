var line_items = [
    {description: "aardvark", price: 425,     qty: -1},
    {description: "PruNe",    price: 1.99,    qty: 1},
    {description: "potato",   price: 0.79,    qty: -10},
    {description: "zebra",    price: 525.25,  qty: 1},
    {description: "SpinAch",  price: 2.99,    qty: 1},
    {description: "zepplin",  price: 20000,   qty: 1},
    {description: "PetUnia",  price: 1.25,    qty: 12},
    {description: "squash",   price: 2.35,    qty: 3}
];

var coupons = [
    {description: "Zebra",  discount: 100,  limit: 1},
    {description: "squash", discount: 1.00, limit: 1},
    {description: "mouse",  discount: 2.00, limit: 10}
];

var $entries, $subTotal, subTotalPrice, $tax, salesTax, taxrate = 0.0725,
    $total, total, hasRun = false;

$(document).ready(function() {

    $entries = $("#entries");
    $subTotal = $('#subtotal');
    $tax = $('#salestax');
    $total = $('#total');

    createTable();
    $('form').on("submit", inputNew);
});

function createTable () {
    if (!hasRun) applyCoupons(coupons, line_items);
    if (!hasRun) zepplinDiscount(line_items);
    formatDescriptions(line_items);
    sort(line_items);

    myUtils.myEach(line_items, function(v, i) {
        addItem(v.price, v.description, v.qty);
    });

    updateSubTotal();
    updateSalesTax();
    updateTotal();
    checkRefund(line_items);
    $("td:contains('-')").addClass('red');
    hasRun = hasRun || true;
}

function addItem(price, title, quantity) {
    var html_string = (myUtils.buildElement("tr",
            myUtils.buildElement("td", title) +
            myUtils.buildElement("td", quantity) +
            myUtils.buildElement("td", myUtils.toCurrencyString(price, "$"))
        )
    );
    $entries.append(html_string);
}

function updateSubTotal() {
    subTotalPrice = myUtils.myReduce(line_items, function(sum, item) {
        return sum + item.qty * item.price;
    });
    $subTotal.text(myUtils.toCurrencyString(subTotalPrice, "$"));
}

function updateSalesTax() {
    salesTax = subTotalPrice * taxrate;
    $tax.text(myUtils.toCurrencyString(salesTax, "$"));
}

function updateTotal() {
    total = subTotalPrice + salesTax;
    $total.text(myUtils.toCurrencyString(total, "$"));
}

function sort(array) {
    myUtils.myEach(array, function(v, i, a) {
        var min, idx, temp;
        idx = i;
        min = a[i];
        for (var j = i + 1; j < a.length; j += 1) {
            if (min.description > a[j].description) {
                min = a[j];
                idx = j;
            }
        }
        temp = a[i];
        a[i] = min;
        a[idx] = temp;
    });
    return array;
}

function formatDescriptions(array) {
  myUtils.myEach(array, function(v, i, a){
    a[i].description = a[i].description.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  });
}

function checkRefund(array) {
  var hasRefund = false;
  myUtils.myEach(array, function(v, i, a){
    if (v.qty < 0) hasRefund = true;
  });
  if (hasRefund) {
    $('#refund').text('Contains Refund');
  }
}

function zepplinDiscount (array) {
  myUtils.myEach(array, function(v, i, a){
    if (v.description === 'zepplin') v.price = v.price * 0.9;
  });
}

function applyCoupons (coupon_array, items_array) {
  myUtils.myEach(coupon_array, function(v, i, a){
    var limit = v.limit;
    myUtils.myEach(items_array, function(vv, ii, aa) {
      if (v.description.toLowerCase() === vv.description.toLowerCase()) {
        while (limit > 0) {
          aa[ii].price -= v.discount;
          limit--;
        }
      }
    });
  });
}

function inputNew(e) {
  e.preventDefault();
  name = $('#nameInput').val();
  amount = $('#amountInput').val();
  line_items.push({description:name,price:amount,qty:1});
  $entries.html("");
  createTable();
}
