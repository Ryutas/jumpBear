enchant();

window.onload = function(){
	
	var core = new Core(320,320);
	core.preload('chara1.png');
	core.fps = 15; //フレームを送る早さ

	core.onload = function(){

		var bear = new Sprite(32,32);
		bear.image = core.assets['chara1.png'];
		bear.x = 0;
		bear.y = 50;
		bear.vx = 0;
		bear.vy = 0;
		bear.jumping = false; //ジャンプ判定
		bear.frame = 1; //スプライトの位置指定

		bear.addEventListener('enterframe',function(){
			var ax = 0;
			this.x += 10;

			// 矢印操作
			//if (core.input.left) this.x -=5;
			//if (core.input.right) this.x +=5;
			//if (core.input.up) this.y -=5;
			//if (core.input.down) this.y +=5;
			if (ax > 0) bear.scaleX = 1;
            if (ax < 0) bear.scaleX = -1;

			 if (bear.vx > 0.3){
              ax -= 0.3;}
            else if (bear.vx > 0){
              ax -= bear.vx;}
            if (bear.vx < -0.3){
              ax += 0.3;}
            else if (bear.vx < 0){
              ax -= bear.vx;}
            bear.vx += ax;

			//タッチ操作
			bear.vx = Math.min(Math.max(bear.vx, -10), 10);
			core.rootScene.on('touchstart',function(){
				if(!bear.jumping) {
					bear.vy = -9;
					bear.jumping = true;
				}
				bear.vy += 0.5;

				bear.x += bear.vx;
				bear.y += bear.vy;

				
			});
			

			/*
			core.rootScene.on('touchstart',function(e){ //タッチの位置がeに入る
				bear.x = e.x;
				bear.y = e.y;
			});
			*/


			//動き続けるパターン
			/*
			this.x += 10;
			this.frame = this.age % 3 + 5; //フレームが動き始めて何コマ目か +5で１弾下の画像
			if (this.x > 320){
				this.x = 0; //これで繰り返す
				this.rotate(2);
				this.scale(1.1,1.1);
			}
			*/
		});
		//core.rootScene.addChild(label);
		core.rootScene.addChild(bear); //rootSceneに乗せる
	}
	core.start(); //フレームのカウントアップ開始
}