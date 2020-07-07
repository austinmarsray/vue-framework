<template>
    <div class="animated fadeIn">
        <Row>
            <Col span="12">
                <DashChartVisitor :ctext="option1.text" :data1="option1.data1" :data2="option1.data2"></DashChartVisitor>
            </Col>
            <Col span="12">
                <DashChartVisitor :ctext="option2.text" :data1="option2.data1" :data2="option2.data2"></DashChartVisitor>
            </Col>
            <Col span="12">
                <DashChartVisitor :ctext="option3.text" :data1="option3.data1" :data2="option3.data2"></DashChartVisitor>
            </Col>
            <Col span="12">
                <DashChartVisitor :ctext="option4.text" :data1="option4.data1" :data2="option4.data2"></DashChartVisitor>
            </Col>
            <Col span="12">
                <DashChartVisitor :ctext="option5.text" :data1="option5.data1" :data2="option5.data2"></DashChartVisitor>
            </Col>
            <Col span="12">
                <DashChartVisitor :ctext="option6.text" :data1="option6.data1" :data2="option6.data2"></DashChartVisitor>
            </Col>
        </Row>
    </div>
</template>

<script>
    import DashChartVisitor from './charts/DashChartVisitor';
    export default {
        components:{DashChartVisitor},
        created (){
            let x = {"OT": 14, "Token": this.$store.state.verification.Token};
            websocket.send(JSON.stringify(x));
            websocket.onmessage =(event)=>{
                let json = JSON.parse(event.data);
                this.result = json['result'];
                console.log(json);
                if (this.result === 1){

                    let text1 = json['type_info'];
                    if (text1.state === 0){
                        this.option1.data2 = [];
                    }
                    else{
                        // let value = text1.detail.map(function (item) {
                        //     return{
                        //         "value":item.Num,
                        //         "name":item.RoadType
                        //     }
                        // });
                        let x = text1.detail;
                        this.option1.data2[0].value = x[0].Num;
                        this.option1.data2[1].value = x[1].Num;
                    }

                    let text2 = json['level_info'];
                    if (text2.state === 0){
                        this.option2.data2 = [];
                    }
                    else{
                        let x = text2.detail;
                        this.option2.data2[0].value = x[0].Num;
                        this.option2.data2[1].value = x[1].Num;
                        this.option2.data2[2].value = x[2].Num;
                        this.option2.data2[3].value = x[3].Num;
                    }

                    let text3 = json['con_level_info'];
                    if (text3.state === 0){
                        this.option3.data2 = [];
                    }
                    else{
                        let x = text3.detail;
                        this.option3.data2[0].value = x[0].Num;
                        this.option3.data2[1].value = x[1].Num;
                        this.option3.data2[2].value = x[2].Num;
                    }

                    let text4 = json['RQIlevel_info'];
                    if (text4.state === 0){
                        this.option4.data2 = [];
                    }
                    else{
                        let x = text4.detail;
                        this.option4.data2[0].value = x[0].Num;
                        this.option4.data2[1].value = x[1].Num;
                        this.option4.data2[2].value = x[2].Num;
                        this.option4.data2[3].value = x[3].Num;
                    }

                    let text5 = json['PCIlevel_info'];
                    if (text5.state === 0){
                        this.option5.data2 = [];
                    }
                    else{
                        let x = text5.detail;
                        this.option5.data2[0].value = x[0].Num;
                        this.option5.data2[1].value = x[1].Num;
                        this.option5.data2[2].value = x[2].Num;
                        this.option5.data2[3].value = x[3].Num;
                    }

                    let text6 = json['PQIlevel_info'];
                    if (text6.state === 0){
                        this.option6.data2 = [];
                    }
                    else{
                        let x = text6.detail;
                        this.option6.data2[0].value = x[0].Num;
                        this.option6.data2[1].value = x[1].Num;
                        this.option6.data2[2].value = x[2].Num;
                        this.option6.data2[3].value = x[3].Num;
                    }

                    this.$Message.success('获取成功!');
                }
                if (this.result === 0){
                    this.$Message.error('执行失败!');
                }
                if (this.result === -1){
                    this.$Message.error('权限不足!');
                }
            }
        },
        name: "statistics",
        data (){
            return {
                option1: {
                    text: '道路类型',
                    data1: ['水泥路', '沥青路'],
                    data2: [
                        {
                            value: 0,
                            name: '水泥路'
                        },
                        {
                            value: 0,
                            name: '沥青路'
                        }
                    ]
                },
                option2: {
                    text: '道路等级',
                    data1: ['快速路', '主干路', '次干路', '支路'],
                    data2: [
                        {
                            value: 0,
                            name: '快速路'
                        },
                        {
                            value: 0,
                            name: '主干路'
                        },
                        {
                            value: 0,
                            name: '次干路'
                        },
                        {
                            value: 0,
                            name: '支路'
                        }
                    ]
                },
                option3: {
                    text: '养护等级',
                    data1: ['1等养护道路', '2等养护道路', '3等养护道路'],
                    data2: [
                        {
                            value: 0,
                            name: '1等养护道路'
                        },
                        {
                            value: 0,
                            name: '2等养护道路'
                        },
                        {
                            value: 0,
                            name: '3等养护道路'
                        }
                    ]
                },
                option4: {
                    text: 'RQI等级',
                    data1: ['A', 'B', 'C','D'],
                    data2: [
                        {
                            value: 0,
                            name: 'A'
                        },
                        {
                            value: 0,
                            name: 'B'
                        },
                        {
                            value: 0,
                            name: 'C'
                        },
                        {
                            value: 0,
                            name: 'D'
                        }
                    ]
                },
                option5: {
                    text: 'PCI等级',
                    data1: ['A', 'B', 'C','D'],
                    data2: [
                        {
                            value: 0,
                            name: 'A'
                        },
                        {
                            value: 0,
                            name: 'B'
                        },
                        {
                            value: 0,
                            name: 'C'
                        },
                        {
                            value: 0,
                            name: 'D'
                        }
                    ]
                },
                option6: {
                    text: 'PQI等级',
                    data1: ['A', 'B', 'C','D'],
                    data2: [
                        {
                            value: 0,
                            name: 'A'
                        },
                        {
                            value: 0,
                            name: 'B'
                        },
                        {
                            value: 0,
                            name: 'C'
                        },
                        {
                            value: 0,
                            name: 'D'
                        }
                    ]
                },
            }
        }
    }
</script>

<style scoped>

</style>