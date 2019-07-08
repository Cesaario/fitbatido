<template>
    <v-container>
        <h2 class='display-3 text-xs-center'>FIT BATIDO</h2>
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 md4>
                <Grafico :chart-data='dados'></Grafico>
            </v-flex>
            <v-btn dark color='#1B5E20' :loading='load1' @click.stop.prevent='enviarClique(0)'>VI UM FIT NÃO BATIDO</v-btn>
            <v-btn dark color='#B71C1C' :loading='load2' @click.stop.prevent='enviarClique(1)'>VI UM FIT BATIDO</v-btn>
            <v-btn dark color='#FBC02D' :loading='load3' @click.stop.prevent='enviarClique(2)'>VI UM FIT MAS NÃO TENHO CERTEZA</v-btn>
        </v-layout>
        <v-snackbar v-model='snackbar' top timeout='5000'>
            <span>Registrado com sucesso! :)</span>
            <v-btn color='red' flat @click.stop.prevent='snackbar = false'>Fechar</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import Grafico from '@/components/Grafico'
    import db from "@/firebase"
    export default {
        components: {
            Grafico
        },
        created(){
            db.collection('contador').onSnapshot(res => {
                const changes = res.docChanges();
                changes.forEach(change => {
                    if(change.type == 'added' || change.type == 'modified'){
                        this.batido = change.doc.data().batido;
                        this.nao_batido = change.doc.data().nao_batido;
                        this.incerto = change.doc.data().incerto;
                        this.atualizarGrafico();
                        console.log("Atualizando...")
                    }
                });
            });
        },
        data(){
            return{
                batido: 1,
                nao_batido: 1,
                incerto: 1,
                load1: false,
                load2: false,
                load3: false,
                snackbar: false,
                dados: {
                    labels: ['Não batido', 'Batido', 'Não tenho certeza'],
                    datasets: [
                        {
                            backgroundColor: ['#1B5E20', '#B71C1C', '#FBC02D'],
                            data: [0, 0, 0]
                        }
                    ]
                }
            }
        },
        methods:{
            enviarClique(tipo){
                if(tipo == 0){
                    this.load1 = true;
                }else if(tipo == 1){
                    this.load2 = true;
                }else if(tipo == 2){
                    this.load3 = true;
                }
                db.collection('contador').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        const contadorAtual = {...doc.data()};
                        console.log(contadorAtual);
                        if(tipo == 0){
                            db.collection('contador').doc('dubXIGrDl0KgcH1RweuS').update({
                                nao_batido: contadorAtual.nao_batido + 1
                            }).then(() => {
                                this.load1 = false;
                                this.snackbar = true;
                            })
                        }else if(tipo == 1){
                            db.collection('contador').doc('dubXIGrDl0KgcH1RweuS').update({
                                batido: contadorAtual.batido + 1
                            }).then(() => {
                                this.load2 = false;
                                this.snackbar = true;
                            })
                        }else if(tipo == 2){
                            db.collection('contador').doc('dubXIGrDl0KgcH1RweuS').update({
                                incerto: contadorAtual.incerto + 1
                            }).then(() => {
                                this.load3 = false;
                                this.snackbar = true;
                            })
                        }
                    });
                });
                
            },
            atualizarGrafico(){
                this.dados = {
                    labels: ['Não batido', 'Batido', 'Não tenho certeza'],
                    datasets: [
                        {
                            backgroundColor: ['#1B5E20', '#B71C1C', '#FBC02D'],
                            data: [this.nao_batido, this.batido, this.incerto]
                        }
                    ]
                }
            }
        }
    }
</script>