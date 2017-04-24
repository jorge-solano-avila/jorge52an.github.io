# README Instructions

# RentApp

## Keywords

* Rent
* Maps
* Statistics
* Markers
* Crimes
* Closeness
* Cheaper rental
* Safety
* Parks
* Recreation
* Grocery stores
* Address
* Distances

## Description of the datasets and function design

1. __Zillow API__

* <https://apizillow.herokuapp.com/zillow-api>
* This is a built-in proxy to query the Zillow API and handle the CORS.
* API URL, zws-id and zpid.
* 10 queries with zpid's.

2. __Crimes - 2001 to present__

* <https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD&method=getByIds&asHashes=true&start=0&length=200>
* Latitude, longitude and address.
* Array with 200 data.

3. __Police stations__

* <https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json>
* Latitude and longitude.
* Array with 23 data.

4. __Parks__

* <https://data.cityofchicago.org/api/views/y7qa-tvqx/rows.json>
* Latitude and longitude.
* Array with 4152 data.

5. __Grocery stores__

* <https://data.cityofchicago.org/api/views/53t8-wyrc/rows.json>
* Latitude and longitude.
* Array with 506 data.

5. __Historical temperatures__

* <https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&startdate=2016-02-01&enddate=2017-02-01&stationid=GHCND:USC00111550&datatypeid=TAVG&includemetadata=false>
* Dates and values in degrees Celsius.
* Array with 12 data.

5. __Historical precipitations__

* <https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&startdate=2016-02-01&enddate=2017-02-01&stationid=GHCND:US1ILCK0036&datatypeid=PRCP&includemetadata=false>
* Dates and values in mm.
* Array with 9 data.

__Y__ Do you use the mandatory dataset Climate Data Online?

## Brief Description

This project shows a map with a marker indicating the current position and others markers for the affordable rental housing. Also, it filters this markers and trace routes in different ways of travel mode. Additionally, it shows a radar chart with 5 different aspects giving detailed information of the rental house.

## Map view

* __Y__ Basic Map with specific location
* __Y__ Markers for location of rental housing
* __Y__ Labels for rental housing's names
* __Y__ Dialog to show detail information of a rental housing
* __Y__ Filters and Trace routes
* __Y__ Trace route in diferent travel modes of a marker to university position

## Data Visualization

* __Y__ Use Graph? What is the type?

To show the detailed information of a house for rent a radar chart is used.

* __Y__ Any interaction available on the graph?

Displays a percentage by placing the pointer over one of the aspects of the chart.

## Interaction Form

* __Y__ Any information output?

The information of a marker in dialog.

* __Y__ Any operation option (filters)?

In the filters the user can drag the slides or edit the input text field.

* __Y__ Any information input?

The parameters in the filter, the distance and the price in the rental house.

* __Y__ Interaction with Map?

  * Filter markers in sidenav panel
  * Trace routes
  * Show dialog in the select a marker

* __Y__ Interaction with data visualization?

Displays a percentage by placing the pointer over one of the aspects of the chart.

## Access the application

To access the application it is only necessary to run a server in src folder since all dependencies are in the index.html and are called by CDN.

The server could be lite-server and installed with npm (npm install -g lite-server).

## Web browsers tested

* Chrome
* Firefox
* Edge