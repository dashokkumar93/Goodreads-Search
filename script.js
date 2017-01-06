$("#searchButton").on("click", function () {
 var val = $("#inputSearch").val();
 val = encodeURI(val);
 var URL = "https://www.goodreads.com/search/index.xml?key=Sbt9viO63Z4UQuX1kSde5w&q=" + val;
 var promise = $.get("https://query.yahooapis.com/v1/public/yql", {
  q: "select * from xml where url=\'" + URL + "\'",
  format: "json"
 });
 promise.done(function (data) {
  Display(data);
 })
});

function Display(json) {
 $(".vertical-center").css("align-items", "baseline");
 var div = $("<div/>").attr({
  "id": "displayItems",
  "class": "col-md-4"
 })

 //$(".vertical-center").append(div);
 var displayTable = $("<table>").attr({
  id: "displayTable",
  class: "table"
 });
 $("#displayTable").remove();
 $(".vertical-center").append(displayTable);
 $("#displayTable").css({
  position: "absolute",
  top: "87px",
  width: "700px",
  "margin-left": "15%"
 })
 var thead = $("<thead>");
 $(displayTable).append(thead);
 $(thead).append("<tr><th>Book Name</th><th>Author Name</th><th>Rating</th></tr>");
 var results = json.query.results.GoodreadsResponse.search.results.work;
 $(".tableElements").remove();
 var tbody = $("<tbody>").attr({
  "class": "tableElements"
 });

 for (let loop = 0; loop < results.length; loop++) {
  //  console.log(results[loop].average_rating);
  console.log(results[loop].average_rating)
  $(tbody).append("<tr><td>" + results[loop].best_book.title + "</td><td>" + results[loop].best_book.author.name + "</td><td>" + results[loop].average_rating + "</td></tr>");
 }
 $(displayTable).append(tbody)

}