<script>
    import { Doughnut, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    export default {
        name: 'Grafico',
        extends: Doughnut,
        mixins: [reactiveProp],
        props: ['options'],
        mounted () {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>