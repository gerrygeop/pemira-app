import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

export default function RealTimeChart({ pemira }) {
    const data = [
        {
            category: "Suara Masuk",
            value: pemira.votes,
        },
    ];

    function handleOnReload() {
        router.get(route("d.dashboard"), "", {
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    }

    useEffect(() => {
        handleOnReload();

        const interval = setInterval(handleOnReload, 8000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let root = am5.Root.new("chartdiv_" + pemira.id);

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "none",
                wheelY: "none",
            })
        );

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
        });
        xRenderer.grid.template.set("visible", false);

        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "category",
                renderer: xRenderer,
            })
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        // Add series
        let series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "category",
                fill: "#22c55e",
            })
        );

        // Rounded corners for columns
        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            tooltipY: 0,
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0,
            width: 300,
        });

        // Add Label bullet
        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueYWorking.formatNumber('#.')}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true,
                }),
            });
        });

        xAxis.data.setAll(data);
        series.data.setAll(data);

        // update data values each 1.5 sec
        setInterval(function () {
            updateData();
        }, 8100);

        function updateData() {
            am5.array.each(series.dataItems, function (dataItem) {
                // let value = dataItem.get("valueY");
                let prev = dataItem.get("valueY");
                let count = pemira.votes - dataItem.get("valueY");
                let value = dataItem.get("valueY") + count;

                // both valueY and workingValueY should be changed, we only animate workingValueY
                dataItem.set("valueY", value);
                dataItem.animate({
                    key: "valueYWorking",
                    from: prev,
                    to: value,
                    duration: 200,
                    easing: am5.ease.out(am5.ease.cubic),
                });
            });
        }

        series.appear(0, 0);
        chart.appear(0, 0);

        // Clean up when component unmounts
        return () => {
            root.dispose();
        };
    }, [pemira.votes]);

    return (
        <div
            id={`chartdiv_${pemira.id}`}
            style={{ width: "100%", height: "500px" }}
        />
    );
}
