import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function BarChartRace({ pemira, setIsFinished }) {
    const { votes, times } = usePage().props;

    useEffect(() => {
        let root = am5.Root.new("chartdiv_" + pemira.id);

        root.numberFormatter.setAll({
            numberFormat: "#a",

            // Group only into M (millions), and B (billions)
            bigNumberPrefixes: [
                {
                    number: 1e6,
                    suffix: "M",
                },
                {
                    number: 1e9,
                    suffix: "B",
                },
            ],

            // Do not use small number prefixes at all
            smallNumberPrefixes: [],
        });

        let stepDuration = 5000;

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "none",
                wheelY: "none",
            })
        );

        // We don't want zoom-out button to appear while animating, so we hide it at all
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes
        var yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 20,
            inversed: true,
        });
        // hide grid
        yRenderer.grid.template.set("visible", false);
        yRenderer.labels.template.setAll({
            fill: am5.color(0x555555),
            fontSize: "12px",
        });

        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                categoryField: "paslon",
                renderer: yRenderer,
            })
        );

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0,
                min: 0,
                strictMinMax: true,
                extraMax: 0.1,
                renderer: am5xy.AxisRendererX.new(root, {}),
            })
        );

        xAxis.set("interpolationDuration", stepDuration / 10);
        xAxis.set("interpolationEasing", am5.ease.linear);

        // Add series
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "name",
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: "value",
                categoryYField: "paslon",
            })
        );

        // Rounded corners for columns
        series.columns.template.setAll({
            cornerRadiusBR: 2,
            cornerRadiusTR: 2,
        });

        // Make each column to be of a different color
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add(
            "stroke",
            function (stroke, target) {
                return chart
                    .get("colors")
                    .getIndex(series.columns.indexOf(target));
            }
        );

        // Add label bullet
        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationX: 1,
                // locationY: 0.5,
                sprite: am5.Label.new(root, {
                    text: "{valueXWorking.formatNumber('#.')}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerX: am5.p100,
                    centerY: am5.p50,
                    populateText: true,
                }),
            });
        });

        var label = chart.plotContainer.children.push(
            am5.Label.new(root, {
                text: times[1],
                fontSize: "1.5em",
                opacity: 0.7,
                x: am5.p100,
                y: am5.p100,
                centerY: am5.p100,
                centerX: am5.p100,
            })
        );

        // Get series item by category
        function getSeriesItem(category) {
            for (var i = 0; i < series.dataItems.length; i++) {
                var dataItem = series.dataItems[i];
                if (dataItem.get("categoryY") == category) {
                    return dataItem;
                }
            }
        }

        // Axis sorting
        function sortCategoryAxis() {
            // sort by value
            series.dataItems.sort(function (x, y) {
                return y.get("valueX") - x.get("valueX"); // descending
            });

            // go through each axis item
            am5.array.each(yAxis.dataItems, function (dataItem) {
                // get corresponding series item
                var seriesDataItem = getSeriesItem(dataItem.get("category"));

                if (seriesDataItem) {
                    // get index of series data item
                    var index = series.dataItems.indexOf(seriesDataItem);
                    // calculate delta position
                    var deltaPosition =
                        (index - dataItem.get("index", 0)) /
                        series.dataItems.length;
                    // set index to be the same as series data item index
                    if (dataItem.get("index") != index) {
                        dataItem.set("index", index);
                        // set deltaPosition instanlty
                        dataItem.set("deltaPosition", -deltaPosition);
                        // animate delta position to 0
                        dataItem.animate({
                            key: "deltaPosition",
                            to: 0,
                            duration: stepDuration / 2,
                            easing: am5.ease.out(am5.ease.cubic),
                        });
                    }
                }
            });

            // sort axis items by index.
            // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
            yAxis.dataItems.sort(function (x, y) {
                return x.get("index") - y.get("index");
            });
        }

        let hour = 1;

        // update data with values each 1.5 sec
        var interval = setInterval(function () {
            hour++;

            if (hour >= Object.keys(votes).length) {
                clearInterval(interval);
                clearInterval(sortInterval);
                setIsFinished(true);
            }

            updateData();
        }, stepDuration);

        var sortInterval = setInterval(function () {
            sortCategoryAxis();
        }, 100);

        function setInitialData() {
            var d = votes[hour];
            for (var n in d) {
                series.data.push({
                    name: n,
                    paslon: n,
                    value: d[n],
                });
                yAxis.data.push({
                    paslon: n,
                });
            }
        }

        function updateData() {
            var itemsWithNonZero = 0;

            if (votes[hour]) {
                label.set("text", times[hour].toString());

                am5.array.each(series.dataItems, function (dataItem) {
                    var category = dataItem.get("categoryY");
                    var value = votes[hour][category];

                    if (value > 0) {
                        itemsWithNonZero++;
                    }

                    dataItem.animate({
                        key: "valueX",
                        to: value,
                        duration: stepDuration,
                        easing: am5.ease.linear,
                    });
                    dataItem.animate({
                        key: "valueXWorking",
                        to: value,
                        duration: stepDuration,
                        easing: am5.ease.linear,
                    });
                });

                yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
            }
        }

        setInitialData();
        setTimeout(function () {
            hour++;
            updateData();
        }, 50);

        series.appear(1000);
        chart.appear(1000, 100);
    }, []);

    return (
        <div
            id={`chartdiv_${pemira.id}`}
            style={{ width: "100%", height: "500px" }}
        />
    );
}
