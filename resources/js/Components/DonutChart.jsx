import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function DonutChart() {
    const { donutChartData } = usePage().props;

    useEffect(() => {
        const data = donutChartData;

        const total_suara = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.value,
            0
        );

        let root = am5.Root.new("donut_chart");
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart and configure it
        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
                innerRadius: am5.percent(60),
            })
        );

        // Create series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false,
                legendLabelText: "{category}:",
                legendValueText: "{value}",
            })
        );

        series.labels.template.setAll({
            textType: "circular",
            text: "{value} suara",
            centerX: 0,
            centerY: 0,
            radius: -20,
            fill: "white",
        });

        series.data.setAll(data);

        chart.seriesContainer.children.push(
            am5.Label.new(root, {
                textAlign: "center",
                centerY: am5.p50,
                centerX: am5.p50,
                text:
                    "[fontSize:18px]Total suara[/]:\n[bold fontSize:30px]" +
                    total_suara +
                    "[/]",
            })
        );

        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15,
            })
        );

        legend.data.setAll(series.dataItems);
        series.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div id={`donut_chart`} style={{ width: "100%", height: "500px" }} />
    );
}
