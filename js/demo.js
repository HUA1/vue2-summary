var storeA = {
	state:{
		message:'storeA',
	},
	mutations:{
	},
	getters:{
	},
	actions:{
	},
	modules:{
		
	}
}
// 直接定义全局对象不会及时更新
var vuexStore = new Vuex.Store({
	state:{
		message:'Hello World',
		bookList:[
			{
				name:'javascript权威指南',
				price:100,
				en:'jq'
			},
			{
				name:'angularjs权威指南',
				price:80,
				en:'aq'
			},
			{
				name:'HTTP权威指南',
				price:50,
				en:'hq'
			}
		]
	},
	mutations:{
		//同步
		showMessage:function(state,data){
			//data是载荷数据
			state.message = 'Store mutations changed this words。'+data;
		}
	},
	getters:{
		filterPrice:function(state){
			var narr = [];
			for(var i = 0;i<state.bookList.length;i++){
				state.bookList[i].price<85 ? narr.push(state.bookList[i]) : null;
			}
			return narr;
		},
		allPrice:function(state){
			var prices = 0;
			for(var i = 0;i<state.bookList.length;i++){
				prices += Number(state.bookList[i].price)
			}
			return prices;
		}
	},
	actions:{
		//异步操作;注意参数是context而不是state
		addBook:function(context){
			setTimeout(function(){
				context.state.bookList.push({name:'HTML5权威指南',price:75})
			},2000);
		}
	},
	modules:{
		a:storeA
	}
});

/*组件注入vuex*/
Vue.component('zujian-a',{
	template:'<h1>{{$store.state.message}}</h1>',
	store:vuexStore
});
var demo_01 = new Vue({
	el:'#demo_01',
	store:vuexStore,
	data:{
		text:'这句话来自数据data.text',
		className:'bg-danger',
		styleSheet:'color:#00f',
		dataBinding:'',
		heroList:[
			{
				name:'李彦宏',
				company:'百度'
			},
			{
				name:'马云',
				company:'阿里巴巴'
			},
			{
				name:'马化腾',
				company:'腾讯'
			}
		],
		htmlCode:'<h1 style="color:#00f">我是html片段</h1>'
	},
	methods:{
		changeBg:function(){
			this.className = this.className != 'bg-danger' ? 'bg-danger' : 'bg-primary';
			
			// console.log(this.$store.getters.filterPrice)
			console.log(this.$store.state.a)
		},
		enterPress:function(){
			alert('按了Enter')
		}
	}
});
var demo_02 = new Vue({
	el:'#demo_02',
	store:vuexStore,
	mounted:function(){
		var _this = this;
		console.log('before change is : '+this.$store.state.message);
		
		//console.log('after change is : '+this.$store.state.message);
	},
	data:{
		dsetIf:'',
		dsetShow:'',
		heroList:[
			{
				name:'李彦宏',
				company:'百度'
			},
			{
				name:'马云',
				company:'阿里巴巴'
			},
			{
				name:'马化腾',
				company:'腾讯'
			}
		]
	},
	methods:{
		setIf:function(name){
			this.dsetIf = name;
		},
		setShow:function(name){
			this.dsetShow = name;
		},
		reset:function(){
			this.dsetIf = '';
			this.dsetShow = '';
		}
	}
});
var demo_03 = new Vue({
	el:'#demo_03',
	store:vuexStore,
	data:{
		blist:[],
		tpls:'',
		showDiv:0
	},
	components:{
		commonInfo:commonInfo,
		commonTip:commonTip
	},
	mounted:function(){
		this.blist = this.$store.state.bookList;
	},
	computed:function(){
		// 动态计算
		//retutn this.blist
	},
	methods:{
		dispatchAction:function(){
			// 分发actions
			this.$store.dispatch('addBook');
			console.log('延时2s增加一本书')
		},
		commitMutations:function(){
			// commit Mutations
			this.$store.commit('showMessage','这句话是传递的，在vuex里叫做载荷');
			console.log('通过commit（showMessage）改变状态库中message的值')
		},
		gettersFun:function(){
			this.blist = this.$store.getters.filterPrice;
			console.log('通过getters返回booklist中价格小于85的书籍列表')
		},
		showCps:function(name){
			this.tpls = name;
			console.log(this)
		},
		transShow:function(){
			this.showDiv == 1 ? this.showDiv = 0 : this.showDiv = 1; 
		}
	}
});
/*定义组件*/
//component.js
/*配置路由*/
var routes = [
		{
			path:'/users/:id',
			component:user
		},
		{
			path:'/manger/:id/:name',
			component:manger
		}
	];
/*实例化路由*/
var router = new VueRouter({
	routes
})

/*注入到跟组件中*/
var demo_05 = new Vue({
	router,
	data:{
		name:'vue-router',
		list:[
			{
				key:'key1',
				value:'100'
			},
			{
				key:'key2',
				value:'2'
			},
			{
				key:'key3',
				value:'3'
			},
		]
	},
	mounted:function(){
		this.$on('change',function(data){
			console.log(data)
		})
	},
	methods:{
		
	}
}).$mount('#demo_05');

Vue.filter('myFilter',function(txt){
	return txt.replace('Hello,world','世界你好')
});
var demo_06 = new Vue({
	el:'#demo_06',
	data:{
		filterInput:'',
		orderByArgs:'',
		orderByType:'',
		filterText:'Hello,world! 需要自定义一个过滤器把英文替换成中文',
		shouDouble:false,
		bookList2:[
			{
				name:'Javascript权威指南',
				price:84,
				en:'javascriptqwzn'
			},
			{
				name:'Angularjs权威指南',
				price:90,
				en:'aqwzn'
			},
			{
				name:'VUE2.0权威指南',
				price:50,
				en:'vueqwzn'
			},
			{
				name:'HTML5权威指南',
				price:75,
				en:'html5qwzn'
			}
		]
	},
	mounted:function(){},
	computed:{
		filbookList:function(){
			var _this = this;
			return this.bookList2.filter(function(item){
				if(item.name.indexOf(_this.filterInput) != -1 || (item.price+'').indexOf(_this.filterInput) != -1 || item.en.indexOf(_this.filterInput) != -1){
					return item
				}
			})
		},
		orderByBooklist:function(){
			var _this = this;
			return _.orderBy(_this.bookList2,_this.orderByArgs,_this.orderByType)
		},
		fileOrder:function(){
			var _this = this;
			var list = _.orderBy(_this.bookList2,_this.orderByArgs,_this.orderByType)
			return list.filter(function(item){
				if(item.name.indexOf(_this.filterInput) != -1 || (item.price+'').indexOf(_this.filterInput) != -1 || item.en.indexOf(_this.filterInput) != -1){
					return item
				}
			})
		}
	},
	methods:{
		shouDoubleFun:function(){
			this.shouDouble = true;
			this.filterInput = '';
			this.orderByArgs = '';
			this.orderByType = '';
		}
	}
});

/*自定义指令
大多数情况下我们只想在bind和update钩子上做重复动作，并不关心其他的钩子函数，
那么你可以这样写：
Vue.directive('sheet',function(el,binding,vNode,oldVNode){
	console.log(el,binding,vNode,oldVNode)
})
*/
Vue.directive('sheet',{
	bind:function(el,binding,vNode,oldVNode){
		console.log('触发bind函数,初始化绑定时使用');
		
		console.log(el,binding,vNode,oldVNode)
	},
	inserted:function(el,binding){
		console.log('触发inserted函数');
		//console.log(binding.value);
		var tpl = '<table class="table table-bordered">';
		for(var i = 0;i<binding.value.length;i++){
			tpl+= '<tr><td>《'+binding.value[i].name+'》</td><td>￥：'+binding.value[i].price+'</td></tr>'
		}
		tpl += '</table>';
		el.innerHTML = tpl
	},
	update:function(el,binding,vNode,oldVNode){
		console.log('触发update函数')
		var tpl = '<table class="table table-bordered">';
		for(var i = 0;i<binding.value.length;i++){
			tpl+= '<tr><td>《'+binding.value[i].name+'》</td><td>￥：'+binding.value[i].price+'</td></tr>'
		}
		tpl += '</table>';
		el.innerHTML = tpl;
		console.log(el,binding,vNode,oldVNode)
	},
	componentUpdated:function(el,binding,vNode,oldVNode){
		console.log('触发componentUpdated函数');
		console.log(el,binding,vNode,oldVNode)
	},
	unbind:function(){
		console.log('触发unbind函数')
	}
});

var demo_07 = new Vue({
	el:'#demo_07',
	data:{
		tableData:[
			{
				name:'Javascript权威指南',
				price:84,
				en:'javascriptqwzn'
			},
			{
				name:'Angularjs权威指南',
				price:90,
				en:'aqwzn'
			},
			{
				name:'HTTP权威指南',
				price:50,
				en:'httpqwzn'
			},
			{
				name:'HTML5权威指南',
				price:75,
				en:'html5qwzn'
			}
		],
		counter:1,
		showtable:false
	},
	mounted:function(){
	},
	methods:{
		addBooks:function(){
			var p = parseInt(Math.random()*100);
			var _this = this;
			this.tableData.push({ name:'习大大语录-'+_this.counter, price:p, en:'javascriptqwzn' })
			this.counter++
			//console.log(this.tableData)
		},
		changeTableVis:function(){
			this.showtable = !this.showtable
		}
	}
});