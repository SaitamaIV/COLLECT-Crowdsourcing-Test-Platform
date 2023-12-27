<template>
<div style="background-color: white;margin-left: 2em">
  <p>    本系统根据众包工人的实际需要和数据分布，为不同的用户量身打造了多种推荐算法。推荐算法用于众包工人可接收任务的推荐。管理员可以根据实际需要，在不同的推荐算法之间相互替换，以期为众包工人提供更好的任务推荐效果。目前实现的推荐算法包括如下三种：基于任务的推荐，基于用户的推荐，基于任务需求说明文档的推荐。算法使用策略模式实现，并支持新规则的扩展，算法的简要描述如下：</p>
  <h1 style="font-size: 1.8em"> 一、基于用户的推荐：</h1>
  <h2 >1.算法基本思想</h2>
  <p>相似的用户对于同一任务有着相似的胜任程度。因此，通过计算用户之间的相似度和用户对部分任务的胜任程度，可以推知全部用户对任务的胜任程度。</p>
  <h2 >2.算法主要流程：</h2>
  <h3 >I.筛选用户任务对。</h3>
  <p>筛选出全部的用户任务对。使用（uid，mid，rating）三元组进行表示。</p>
  <p>其中，uid是用户的唯一表示。mid是任务的唯一标识。rating用于度量用户对于任务的胜任程度。rating的值域为（0，1）。根据实际情况，认定rating大于等于0.2为用户胜任任务。因此，rating&gt;=0.2为数据筛选标准。</p>
  <p>rating是一个多指标融合的综合度量指标。由用户活跃度（activation），用户能力（ability)，用户意愿(interest)，任务难度(difficulty)四项指标复合而成。</p>
  <p>四项指标的计算方法如下：</p>
  <p>（1）activation：用户活跃度，采用用户总接包次数进行度量。默认数据上限为64。归一化操作为：activation=log(f+1)/6 其中,f为用户总接包次数。</p>
  <p>（2）ability:用户能力。与用户提交报告的评分相关。其计算方法为：</p>
  <p><img src="../assets/img/notice-1.png" referrerpolicy="no-referrer"></p>
  <p>将值域归一化。</p>
  <p>（3）interest:用户意愿。通过任务和用户测试类型计算。其计算方法为：</p>
  <p><img src="../assets/img/notice-2.png" referrerpolicy="no-referrer"></p>
  <p>（4）difficulty:任务难度。创建任务时指定。将值域归一化。</p>
  <p>度量方法采用AHP层次分析法。层次结构如图所示：   </p>
  <p><img src="../assets/img/notice-3.png" referrerpolicy="no-referrer" alt="rating的计算"></p>
  <p><img src="../assets/img/notice-4.png" referrerpolicy="no-referrer"></p>
  <h3 >II.计算用户之间的相似度。</h3>
  <p>用户的的相似度通过用户胜任相同的任务占全部任务的比例来衡量。</p>
  <h3 >III.预测其它用户和任务的胜任程度。</h3>
  <p>预测胜任程度=原胜任程度*用户相似度。</p>
  <p> </p>
  <h1 style="font-size: 1.8em">二．基于任务的推荐：</h1>
  <h2 >1.算法基本思想：</h2>
  <p>相似的任务对于被同一用户胜任。通过分析任务之间的相似度。就可由部分用户对部分任务的胜任程度推至该用户对全部任务的胜任程度。进而达到推荐目的。</p>
  <h2 >2.  算法主要流程：</h2>
  <h3 >I.  筛选用户任务对。</h3>
  <p>方法同上。</p>
  <h3 >II. 计算任务之间的相似度。</h3>
  <h3 >III.   预测用户对其它任务的胜任程度。</h3>
  <p> </p>
  <h1 style="font-size: 1.8em">三．基于任务需求说明文档的推荐</h1>
  <h2 >1.  算法基本思想</h2>
  <p>算法通过分析任务需求文档的文本相似度推至任务之间的相似程度推算</p>
  <p>任务之间的相似程度。根据用户所有已完成任务与某一任务相似程度的平均值计算与用户所有已完成总体样本最为相似的任务。</p>
  <p>算法使用tfidf计算文本距离。</p>
  <p>多种推荐方式可根据实际情况相互替换，后续会有其它基于图片相似度的任务推荐方式。</p>

</div>

</template>

<script>
export default {
  name: "notice",
  data() {
    return {

    };
  },
  methods: {
  }
}



</script>

<style scoped>


</style>