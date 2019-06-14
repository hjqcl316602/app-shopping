import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.mixin( {
  methods:{

    $request({url ,type = 'POST' ,data ,responseType = 'json' ,headerContentType='application/x-www-form-urlencoded' , loading = false,interval=0 }){

      if(loading){
        this.$createLoading().show();
        interval = 300; // 如果需要加载动画，则延长返回时间，否则接口过快，出现页面闪烁
      }
      return new Promise((resolve,reject)=>{
        axios({
          url:`${url}`,
          baseURL:this.$configs['HTTP_REQUEST_SC'],
          data:data,
          transformRequest: [function (data) {
            data = qs.stringify(data);
            return data
          }],
          method:type,
          headers: {'Content-Type': headerContentType },
          timeout:10000
        }).then((reponse)=>{

          setTimeout(()=>{

            setTimeout(()=>{
              this.$createLoading().hide();
            },100);


            let data = reponse.data;
            if(data['code'] == '000'){
              resolve(data)
            }else if(data['code'] == '004'){
              let router = window.location.href.split('#')[1];
              sessionStorage.setItem('redirect',router );
              let fromUser = this.$https.query(window.location.href)['fromUser'] || '';
              sessionStorage.setItem('fromUser',fromUser );

              this.$router.push({ path: '/SubPage/SubLogin' });
              //this.$router.push({ path: '/SubPage/SubLogin', query: { redirect: router }});
              ///this.init_login(); // 接口调用失败后处理
            }else{
              reject(data);
            }
          },interval)

        },(data)=>{
          this.$toast('请求失败，请检查网络');

          setTimeout(()=>{
            this.$createLoading().hide();
          },100);

        }).catch( (error)=> {

          setTimeout(()=>{
            this.$createLoading().hide();
          },100);

          console.error(error)
        })
      })
    },
  }
});

