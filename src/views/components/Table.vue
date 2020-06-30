<template>
    <div class="animated fadeIn">
        <Row>
            <Col span="24" >
                <Table :columns="columns14" :data="data5" border :span-method="handleSpan"></Table>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns14: [
                    {
                        title: 'Date',
                        key: 'date'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data5: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            handleSpan ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 0 && columnIndex === 1) {
                    return  [0, 0];
                }
                if (rowIndex === 2 && columnIndex === 0) {
                    return {
                        rowspan: 1,
                        colspan: 2
                    };
                } else if (rowIndex === 3 && columnIndex === 0) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
</script>
