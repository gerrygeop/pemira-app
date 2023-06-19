import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function BarChart() {
    const { barChartData } = usePage().props;

    useEffect(() => {
        const data = barChartData;

        let root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout,
            })
        );

        // Create axes
        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "category",
                renderer: xRenderer,
            })
        );

        xRenderer.grid.template.setAll({
            location: 1,
        });

        xAxis.data.setAll(data);

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1,
                }),
            })
        );

        // Add series
        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "category",
            })
        );

        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY} Pemilih",
            tooltipY: 0,
            strokeOpacity: 0,
            width: 150,
        });

        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.data.setAll(data);

        // Make stuff animate on load
        series.appear();

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueY}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true,
                }),
            });
        });

        chart.appear(1000, 100);

        // Clean up when component unmounts
        return () => {
            root.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
}
