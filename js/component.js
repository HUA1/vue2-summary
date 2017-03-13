var header = Vue.component('tk-header',{
	template:'<header class="tk-header" :class="{\'is-fixed\':fixed}">\
			<div class="tk-header-button is-left" @click="backHandle()">\
				<slot name="left"></slot>\
			</div>\
			<h1 class="tk-header-title" v-text="pagename"></h1>\
			<div class="tk-header-button is-right" @click="moreHandle()">\
				<slot name="right"></slot>\
			</div>\
		</header>',
	props:['fixed','pagename'],
	data:function(){
		return {}
	},
	mounted:function(){
		//console.log(this)
	},
	methods:{
		backHandle:function(){
			alert('left btn click')
		},
		moreHandle:function(){
			alert('right btn click')
		}
	}
});

var commonEdit = Vue.component('common-edit',{
	template:	'<div>\
					<div class="row" v-for="list in useJson">\
						<label class="col-xs-3 text-right">{{list.call}}</label>\
						<div class="col-xs-6">\
						<input v-if="list.type == \'text\'" :type="list.valType" v-model="output[list.key]" class="form-control" />\
						<textarea v-if="list.type == \'textarea\'" v-model="output[list.key]"></textarea>\
						</div>\
					<p class="clearfix"></p>\
					</div>\
				</div>',
	data:function(){
		return {
			output:{},
			useJson:[]
		}
	},
	props:['listjson'],
	mounted:function(){
		console.log('通用的编辑生成组件');
		//根据listjson生成即将返回的对象
		var _this = this,
			transforObj = {};
		this.$options.propsData.listjson.map(function(item,index){
			//transforObj = {};
			_this.output[item.key] = item.value;
			//_this.output.push(transforObj)
		});
		this.useJson = this.$options.propsData.listjson;
		//_this.output = transforObj;
	},
	methods:{
	}
});

var commonInfo = Vue.component('common-info',{
	template:'<div>信息组件</div>',
	data:function(){
		return {
		}
	},
	mounted:function(){
	},
	methods:{
	}
});

var commonTip = {
	template:'<div>提示组件</div>',
	data:function(){
		return {
		}
	},
	mounted:function(){
	},
	methods:{
	}
};

var user = Vue.component('user',{
	template:	'<div>\
					<h1>{{name}}</h1>\
					<p>URL参数是：{{this.$route.params}}</p>\
					<common-edit ref="ce" :listjson="listjsons"></common-edit>\
					<div class="btn btn-primary" @click="getChildValue()">查看通用输入组件值</div>\
				</div>',
	data:function(){
		return {
			name:'这是通用用户组件',
			listjsons:[
				{
					type:'text',
					valType:'text',
					call:'书籍名称',
					key:'name',
					value:'书籍名称'
				},
				{
					type:'text',
					valType:'number',
					call:'书籍价格',
					key:'price',
					value:50
				},
				{
					type:'textarea',
					valType:'text',
					call:'书籍简介',
					key:'desc',
					value:'书籍简介'
				}
			]
		}
	},
	mounted:function(){
		console.log(this)
	},
	methods:{
		getChildValue:function(){
			console.log(this.$refs.ce.output)
		}
	}
});
var manger = Vue.component('manger',{
	template:'<div><h1>{{name}}</h1><p>URL参数是：{{this.$route.params}}</p></div>',
	data:function(){
		return {
			name:'这是通用管理组件'
		}
	},
	mounted:function(){
		console.log(this.$route)
	},
	computed:{
		url:function(){
			return this.$route.params.id
		}
	}
})