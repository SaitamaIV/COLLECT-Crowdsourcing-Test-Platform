<template>
  <div>
    <div style="background-color: white">
    </div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph'
export default {
  components: { RelationGraph },
  data() {
    return {
      uid:'',
      mid:'',
      fid:'',

      reports:[],


      graph_json_data: {
        rootId: '0',
        nodes: [
          { id: '0', text: '', borderColor: 'yellow', fontColor: 'white'},
        ],
        links: [
        ]
      },
      graphOptions: {
        defaultNodeBorderWidth: 0,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
    }
  },
  mounted() {
    this.fid=this.$route.query.fid
    this.init()
    console.log(this.title)

  },
  methods: {
    sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
          return;
      }
    },
    init(){
      this.$http({
        url: `fetchmission/searchreportbyfid?fid=${this.fid}`,
        method: "get"
      }).then(({data}) => {
        this.graph_json_data.nodes[0].text=data.fetchmission.title

        this.$http({
          url: `fetchmission/getsimilaritygraph?fid=${this.fid}`,
          method: "get"
        }).then(({data}) => {
          this.reports=data
          console.log(this.reports)
          for(let i=0;i<this.reports.length;i++){
            let node={id: this.reports[i].fid.toString(), text: this.reports[i].title, color: '#43a2f1', fontColor: 'yellow' }
            let link={from: this.reports[i].fid.toString(), to: '0', text: Number(this.reports[i].similarity*100).toFixed()+"%", color: '#43a2f1'}
            this.graph_json_data.nodes.push(node)
            this.graph_json_data.links.push(link)
          }
          this.showSeeksGraph()
        });
      });
    },
    showSeeksGraph(query) {
      console.log(this.graph_json_data)
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(this.graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick(nodeObject, $event) {
      if(nodeObject.id==='0'){
        return
      }
      let report=this.reports.filter(function (item) {
        return item.fid.toString() === nodeObject.id
      })
      // console.log('onNodeClick:', nodeObject.id)
      // console.log(report)
      this.$router.push({
        path:'/report/detail',
        query:{
          fid:nodeObject.id
        }
      })
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject.id)
    }
  }
}
</script>