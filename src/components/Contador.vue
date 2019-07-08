<template>
    <v-container>
        <h2 class='display-3 text-xs-center'>FIT BATIDO</h2>
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 md4>
                <Grafico :chart-data='dados'></Grafico>
            </v-flex>
            <v-btn dark color='#1B5E20'>VI UM FIT NÃO BATIDO</v-btn>
            <v-btn dark color='#B71C1C'>VI UM FIT BATIDO</v-btn>
            <v-btn dark color='#FBC02D'>VI UM FIT MAS NÃO TENHO CERTEZA</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import Grafico from '@/components/Grafico'
    export default {
        components: {
            Grafico
        },
        data(){
            return{
                dados: {
                    labels: ['Não batido', 'Batido', 'Não tenho certeza'],
                    datasets: [
                        {
                            backgroundColor: ['#1B5E20', '#B71C1C', '#FBC02D'],
                            data: [30, 30, 40]
                        }
                    ]
                }
            }
        }
    }
</script>