(()=>{"use strict";var t={882:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.copy_data=e.RGBA=e.Rect=e.XY=e.W=e.H=void 0,e.H=400,e.W=400;class n{constructor(t,n,o=!1){this.x=t,this.y=o?e.H-1-n:n,this.x<10&&(this.x=0),this.x>e.W-10&&(this.x=e.W),this.y<10&&(this.y=0),this.y>e.H-10&&(this.y=e.H)}}e.XY=n,e.Rect=class{constructor(t,e){this.xy1=new n(Math.min(t.x,e.x),Math.min(t.y,e.y)),this.xy2=new n(Math.max(t.x,e.x),Math.max(t.y,e.y))}to_str(){return`${this.xy1.x} ${this.xy1.y} ${this.xy2.x} ${this.xy2.y}`}},e.RGBA=class{constructor(t,e,n,o){this.r=t,this.g=e,this.b=n,this.a=o}to_str(){return`rgba(${this.r},${this.g},${this.b},${this.a/255})`}to_str_for_output(){return`${this.r} ${this.g} ${this.b} ${this.a}`}},e.copy_data=function(){!function(t){const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.focus(),e.select();try{document.execCommand("copy")}catch(t){console.error("Unable to copy to clipboard",t)}document.body.removeChild(e)}(document.getElementById("output_data").innerText)}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}(()=>{const t=n(882),e=document.getElementById("input"),o=e.getContext("2d"),r=document.getElementById("input_rect"),i=r.getContext("2d"),c=document.getElementById("output"),d=c.getContext("2d"),s=document.getElementById("seed"),l=document.getElementById("X"),a=document.getElementById("Y"),y=document.getElementById("hovered-color"),u=document.getElementById("selected-color"),h=document.getElementById("ok_button"),x=document.getElementById("back_button"),m=document.getElementById("clear_button"),g=document.getElementById("download_button"),p=document.getElementById("output_data"),v=document.getElementById("output_data_num");let f=1;const E=new Image;E.crossOrigin="anonymous",E.src=`/input/${f}.png`,E.addEventListener("load",(()=>{o.drawImage(E,0,0),E.style.display="none"})),s.addEventListener("change",(t=>{const{target:e}=t;if(!(e instanceof HTMLInputElement))throw new Error("AssertionError");p.children.length>1&&!confirm("ok?")||(f=parseInt(e.value,10),E.src=`/input/${f}.png`,o.drawImage(E,0,0),m.click())}));let _,w,I,B=new t.RGBA(255,255,255,255);function k(n,r,i){const c=e.getBoundingClientRect(),d=n.clientX-c.left,s=n.clientY-c.top,l=o.getImageData(d,s,1,1).data,a=new t.RGBA(l[0],l[1],l[2],l[3]);return i&&(B=a),r.style.background=a.to_str(),a}i.setLineDash([5,2]),window.onmouseup=e=>{void 0!==_&&void 0!==w&&(I=new t.Rect(new t.XY(_.x,_.y,!0),new t.XY(w.x,w.y,!0)),_=void 0)},r.addEventListener("mousedown",(e=>{_=new t.XY(e.offsetX,e.offsetY)})),r.addEventListener("mousemove",(e=>{w=new t.XY(e.offsetX,e.offsetY),l.innerText=w.x.toString(),a.innerText=w.y.toString(),k(e,y,!1),void 0!==_&&(i.strokeStyle="#ff0000",i.lineWidth=2,i.clearRect(0,0,r.width,r.height),i.beginPath(),i.rect(_.x,_.y,w.x-_.x,w.y-_.y),i.stroke())})),r.addEventListener("contextmenu",(t=>(t.preventDefault(),k(t,u,!0),!1)),!1);let b=[],R=0;h.addEventListener("click",(e=>{if(void 0===I)return void alert("orig is undefined");d.fillStyle=B.to_str(),d.fillRect(I.xy1.x,t.H-1-I.xy1.y,I.xy2.x-I.xy1.x,-I.xy2.y+I.xy1.y),b.push({color:B.to_str(),rect:I});const n=document.createElement("div");n.innerText+=I.to_str()+" "+B.to_str_for_output(),n.style.color=B.to_str(),p.appendChild(n),R++,v.innerText=R.toString()})),x.addEventListener("click",(()=>{w=void 0,_=void 0,i.clearRect(0,0,r.width,r.height),d.clearRect(0,0,c.width,c.height),1!=p.children.length&&b.length&&(p.removeChild(p.lastChild),b.pop(),b.forEach((e=>{d.fillStyle=e.color,d.fillRect(e.rect.xy1.x,t.H-1-e.rect.xy1.y,e.rect.xy2.x-e.rect.xy1.x,-e.rect.xy2.y+e.rect.xy1.y)})),R--,v.innerText=R.toString())})),m.addEventListener("click",(()=>{for(;p.children.length>1;)p.removeChild(p.lastChild);b.length=0,w=void 0,_=void 0,i.clearRect(0,0,r.width,r.height),d.clearRect(0,0,c.width,c.height),R=0,v.innerText=R.toString()})),window.onkeydown=function(t){" "===t.key&&(t.preventDefault(),h.click()),t.ctrlKey&&"z"===t.key&&(t.preventDefault(),x.click()),t.ctrlKey&&"q"===t.key&&(t.preventDefault(),m.click())},g.addEventListener("click",(()=>{(0,t.copy_data)()}))})()})();