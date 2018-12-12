function home(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    //$('#index').show();
}

function cars() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('cars', function (data) {
        var table = $('<table id="Cars"></table>');
        var title = $("<tr><th colspan='10'>Cars</th></tr>");
        var head = $("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        thead.append(title);
        thead.append(head);
        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameData = $('<td>' + value.name + '</td>');
            var consumptionData = $('<td>' + value.consumption + '</td>');
            var colorData = $('<td>' + value.color + '</td>');
            var manufacturerData = $('<td>' + value.manufacturer + '</td>');
            var availableData = $('<td>' + value.available + '</td>');
            var yearData = $('<td>' + value.year + '</td>');
            var horsepowerData = $('<td>' + value.horsepower + '</td>');
            line.append(nameData);
            line.append(consumptionData);
            line.append(colorData);
            line.append(manufacturerData);
            line.append(availableData);
            line.append(yearData);
            line.append(horsepowerData);
            tbody.append(line);
        });
        table.append(thead);
        table.append(tbody);
        $("#cars").show().html(table);
    })
}

function manufacturers() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturersData"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th colspan='10'>Manufacturers</th></tr>");
        var head = $("<th>Name</th><th>Country</th><th>Founded</th>");
        thead.append(title);
        thead.append(head);
        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameData = $('<td>' + value.name + '</td>');
            var countryData = $('<td>' + value.country + '</td>');
            var foundedData = $('<td>' + value.founded + '</td>');
            line.append(nameData);
            line.append(countryData);
            line.append(foundedData);
            tbody.append(line);
        });
        table.append(thead);
        table.append(tbody);
        $("#manufacturers").show().html(table);
    })
}

function addCar() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $("#addCarsForm").on("submit", function (event) { event.preventDefault();

        $.post("/addCar", {"name": $("#carName").val(), "consumption": $("#carConsumption").val(), "color": $("#carColor").val(), "manufacturer": $("#carManufacturer").val(),"available": $("#carAvailable").val(), "year": $("#carYear").val(), "horsepower": $("#carHorsepower").val()}
        , function () {alert("Sikeres a hozzáadás!");
        }).fail(function () {alert("Sikertelen!");
        });
    });

    $.get("/manufacturerNames", function (names) { names.forEach(function (name) {
        $("#carManufacturer").append('<option value="' +  name + '">' + name + '</option>');
    });
    });
    $('#addCarsForm').show();


}

function addManufacturer() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#manufacturer").hide();
    $('#addManufacturerForm').on('submit', function (event) {
        event.preventDefault();

        var name = $("#manufacturerName").val();
        var country = $("#manufacturerCountry").val();
        var founded = $("#manufacturerFounded").val();

        $.post("/addManufacturers", {name: name, country: country, founded: founded}
            , function(){alert("Hozzáadás sikeres!");
            }).fail(function() {alert("Hiba!");});
    });
    $("#addManufacturerForm").show();
    document.getElementById("addManufacturerForm()").reset();
}

function manufacturer(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturerTable"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th>Choice a manufacturer</th></tr>");
        var selectorLine = $("<tr></tr>");
        var submitLine = $("<tr></tr>");
        var selector = $('<select id="selector">Car List</select>');
        thead.append(title);
        selectorLine.append(selector);
        tbody.append(selectorLine);

        $.each(data, function (key, value) {
            var manufacture = $('<option>'+ value.name +'</option>');
            selector.append(manufacture);
        });
        var submit = $('<input type="button" onclick="loadCarsByManufacturer()" value="Submit"></button>');
        submitLine.append(submit);
        tbody.append(submitLine);
        table.append(thead);
        table.append(tbody);
        $("#manufacturer").show().html(table);
    })

}

function loadCarsByManufacturer() {

    document.cookie='name=' + document.getElementById("selector").value;

    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('/manufacturer', function (data) {
        var table = $('<table id="byManufacturerTable"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th colspan='7'>Cars By Manufacturer</th></tr>");
        var head = $("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        thead.append(title);
        thead.append(head);

        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell =  $('<td>' + value.color + '</td>');
            var manufacturerCell =  $('<td>' + value.manufacturer + '</td>');
            var availableCell =  $('<td>' + value.available + '</td>');
            var yearCell =  $('<td>' + value.year + '</td>');
            var horsePowerCell =  $('<td>' + value.horsepower + '</td>');

            line.append(nameCell);
            line.append(consumptionCell);
            line.append(colorCell);
            line.append(manufacturerCell);
            line.append(availableCell);
            line.append(yearCell);
            line.append(horsePowerCell);
            tbody.append(line)
        });
        table.append(thead);
        table.append(tbody);
        $('#manufacturer').show().html(table);

    })
}

