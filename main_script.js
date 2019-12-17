function show_error(pesan) {
	$(".error_form").find('b').html(pesan);
	$(".error_form").show();
	$(".error_form").fadeOut(2500);
}

//Validasi input kosong
$.fn.validateEmpty = function () {
	var form = this;

	form.on('submit', function (event) {
		event.preventDefault();
		var inputan = form.find("input,select");
		// console.log(inputan);

		inputan.each(function(index, el) {
			if ($(el).val() == "") {
				show_error("Harap lengkapi data isian");
				return false;
			}
			else{
				form.off('submit').trigger('submit');
			}
		});
	});
}

//Validasi form register
$.fn.validasiRegister = function () {
	var form = this;

	form.on('submit', function(event) {
		event.preventDefault();
		var nama = $("input[name='nama']").val();
		var email = $("input[name='email']").val();
		var password = $("input[name='password']").val();
		var konfirm_password = $("input[name='konfirm_password']").val();
		var no_hp = $("input[name='no_hp']").val();
		var gender = $("input[name='gender']:checked").val();
		var kelas = $("select[name='kelas']").val();

		//RegEx
		var namaReg = /^[a-zA-Z' ]+$/; //alfabet(besar atau kecil), petik ('), dan spasi saja
		var angka = /^\d+$/; //angka saja
		
		if (nama == "" || email == "" || password == "" || konfirm_password == "" || no_hp == "" || gender == "" || kelas == "") {
			show_error('Harap lengkapi data diri untuk melakukan pendaftaran');
		}
		else if (!namaReg.test(nama)) {
			show_error("Nama hanya boleh menggunakan huruf dan tanda petik (')");
		}
		else if (password.length < 6) {
			show_error("Password harus minimal 6 karakter");
		}
		else if (password != konfirm_password) {
			show_error("Konfirmasi password tidak sesuai");
		}
		else if (!angka.test(no_hp)) {
			show_error("Nomor HP hanya boleh menggunakan angka");
		}
		else{
			// document.location.href = "dashboard.html";
			$(this).off('submit').trigger('submit');
		}
	});
}

//Validasi Login
$.fn.validasiLogin = function () {
	var form = this;

	this.on("submit", function(event) {
		event.preventDefault();
		var email = $("input[name='email']").val();
		var password = $("input[name='password']").val();

		if(email == "" || password == ""){
			show_error('Harap isi email dan password untuk login');
		}
		else if (email != "email" && password != "password") {
			show_error('Email atau Password salah. Coba lagi');
		}
		else{
			// document.location.href = "dashboard.html";
			$(this).off("submit").trigger("submit");
		}
	});
}

//Validasi Profile
$.fn.validasiProfile = function () {
	var form = this;

	form.on("submit", function(event) {
    	event.preventDefault();

    	var nama = $("input[name='nama']").val();
    	var no_hp = $("input[name='no_hp']").val();
    	var email = $("input[name='email']").val();
    	var gender = $("input[name='gender']:checked").val();
    	var kelas = $("select[name='kelas']").val();

    	//RegEx
		var namaReg = /^[a-zA-Z' ]+$/; //alfabet(besar atau kecil), petik ('), dan spasi saja
		var angka = /^\d+$/; //angka saja

    	if (nama == "" || email == "" || no_hp == "" || gender == "" || kelas == "") {
    		show_error("Harap lengkapi data profil");
    	} 
    	else if (!namaReg.test(nama)) {
    		show_error("Nama hanya boleh menggunakan huruf dan tanda petik (')");
    	}
    	else if (!angka.test(no_hp)) {
			show_error("Nomor HP hanya boleh menggunakan angka");
		}
    	else {
    		$(this).off('submit').trigger('submit');
    	}
   });
}

//Validasi video les
$.fn.validasiNewVideo = function () {
	var form = this;

	form.on("submit", function(event) {
		event.preventDefault();
		var jenjang = $("select[name='jenjang']").val();
		var mapel = $("select[name='mapel']").val();
		var materi = $("input[name='materi']").val();
		var pengajar = $("input[name='pengajar']").val();
		var vid = $("input[name='video_les']").val();

		//RegEx
		var namaReg = /^[a-zA-Z' ]+$/; //alfabet(besar atau kecil), petik ('), dan spasi saja

		if(jenjang == "" || mapel == "" || materi == "" || pengajar == "" || vid == ""){
			show_error('Harap lengkapi data-data video les');
		}
		else if (!namaReg.test(materi)) {
			show_error('Nama materi hanya boleh menggunakan huruf');
		}
		else if (!namaReg.test(pengajar)) {
			show_error('Nama pengajar hanya boleh menggunakan huruf dan tanda petik');
		}
		else{
			// window.location.href = "adm_les_streaming_show.html";
			$(this).off('submit').trigger('submit');
		}
	});
}

//Menampilkan preview dan info gambar
$.fn.uploadGambar = function () { //extending jquery
	this.change(function(event) {
    	if(this.files.length > 0){
    		console.log(this.files[0]);
 			var name = this.files[0].name;
 			var size = this.files[0].size;

 			var ukuran = "";
 			if (size >= 1000000 ) { //MB
 				size = Math.ceil(size/1000000); 
 				ukuran = size + "MB"; 
 			} 
 			else if (size >= 1000) { //KB
 				size = Math.ceil(size/1000);
 				ukuran = size + "KB";
 			}
 			else if(size < 1000){
 				ukuran = size + "Byte";
 			}
 			
 			$("#file_info").html(`
 				<p>Nama File : `+name+`</p>
 				<p>Ukuran File : `+ukuran+`</p>
 				`
 			);
    		
    		if (this.files && this.files[0]) {
    		  var reader = new FileReader();

    		  reader.onload = function(e) {
    		    $('#avatar_img').show();
    		    $('#avatar_img').attr('src', e.target.result);
    		  }

    		  reader.readAsDataURL(this.files[0]);
    		}
    	}
	});
}

//Menampilkan preview dan info video
$.fn.uploadVideo = function () {
	this.change(function() {
		if(this.files.length > 0){
			var url =  window.URL.createObjectURL(this.files[0]);
			$("#preview_vid").html(`
				<video src="`+url+`" controls="" autoplay=""></video>
				`
			);
			var new_vid = $("#preview_vid video");
			new_vid.onload = function () {
				window.URL.revokeObjectURL(url);
			};

			var name = this.files[0].name;
			var size = this.files[0].size;

			var ukuran = "";
			if (size >= 1000000 ) { //MB
				size = Math.ceil(size/1000000); 
				ukuran = size + "MB"; 
			} 
			else if (size >= 1000) { //KB
				size = Math.ceil(size/1000);
				ukuran = size + "KB";
			}
			else if(size < 1000){
				ukuran = size + "Byte";
			}
			
			$("#file_info").html(`
				<p>Nama File : `+name+`</p>
				<p>Ukuran File : `+ukuran+`</p>
				`
			);
		}
	});
}

//Filter Jenjang dan Mata Pelajaran
function filter_les() {
	$("select[name='mapel'],select[name='jenjang']").change(function(event) {
		var mapel = $("select[name='mapel']").val();
		var jenjang = $("select[name='jenjang']").val();

		console.log('mapel= '+mapel);
		console.log('jenjang= '+jenjang);

		if (mapel != "" || jenjang != "") {
			$(".link_layanan").hide();
			// $("#load_btn").hide();
			cariVideo();

			if (mapel != "" && jenjang != "") {
				console.log('m dan j');
				$(".link_layanan").each(function(index, el) {
					if ($(el).attr('mapel').toLowerCase() == mapel.toLowerCase() && $(el).attr('jenjang').toLowerCase() == jenjang.toLowerCase() ) {
						$(el).show();
					}
				});
			}
			else if(jenjang == ""){
				$(".link_layanan").each(function(index, el) {
					if ($(el).attr('mapel').toLowerCase() == mapel.toLowerCase()) {
						$(el).show();
					}
				});
			}
			else if(mapel == ""){
				$(".link_layanan").each(function(index, el) {
					if ($(el).attr('jenjang').toLowerCase() == jenjang.toLowerCase()) {
						$(el).show();
					}
				});
			}
		}
		else if (mapel == "" && jenjang == "") {
			$(".link_layanan").show();
			cariVideo();
		}
		
	});
}

//Video Les Streaming Search 
function cariVideo() {
	$("#search_field").on("keyup", function() {
	   var value = $(this).val().toLowerCase();
	   	$(".link_layanan").filter(function() {
	      	$(this).toggle($(this).find("h4").text().toLowerCase().indexOf(value) > -1)
	   });
	});
}

//Table Search
function cariTabel() {
	$("#search_field").on("keyup", function() {
		$(".paginasi").hide();
	   var value = $(this).val().toLowerCase();
	   	$("tbody tr").filter(function() {
	      	// $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	      	if ($(this).text().toLowerCase().indexOf(value) > -1) {
	      		if(value == ""){
	      			$(".paginasi").show();
	      			paginasi();
	      		}
	      		else{
	      			$(this).removeClass('hilang');
	      		}
	      	}
	      	else{
	      		$(this).attr('class','hilang');
	      	}
	   	});
	});
}

//Table Pagination
function paginasi() {
	var total = $("tbody tr").length;
  	var limit = 5;
  	var jml_page = Math.ceil(total / limit);
  	// console.log(jml_page);

  	var gabung = `<li class="page_notActive page_prev"><i class="fas  fa-chevron-left"></i>`;
  	for (var i = 1; i <= jml_page; i++) {
   	gabung += '<li class="page" id="pg'+i+'">'+i+'</li>';
  	}
  	gabung += `<li class="page_next"><i class="fas fa-chevron-right"></i></li>`;
  	$('.paginasi ul').html(gabung);

  	$('.paginasi ul li:nth-child(2)').addClass('page_active');
  
  	$('tbody tr').attr('class','hilang');
  	for (var i = 1; i <= limit; i++) {
   	$('tbody tr:nth-child('+i+')').removeClass('hilang');
  	}


  	$('.page').click(function(event) {
   	var hal = $(this).text();
   	hal = Number(hal);
   	// console.log(hal);

   	if (hal == 1) {
   		$(".paginasi ul li.page_prev").addClass('page_notActive');	
   	}
   	else{
   		$(".paginasi ul li.page_prev").removeClass('page_notActive');
   	}

   	if (hal == jml_page ) {
   		$(".paginasi ul li.page_next").addClass('page_notActive');
   	}
   	else{
   		$(".paginasi ul li.page_next").removeClass('page_notActive');	
   	}

   	var offset = (hal-1)*limit;
   	// console.log('offset= '+offset);

   	$('li.page_active').removeClass('page_active');
   	$(this).addClass('page_active');

   	$('tbody tr').attr('class','hilang');
   	if ((total-offset) < limit) {
      	for (var i = offset+1; i <= total; i++) {
       		$('tbody tr:nth-child('+i+')').removeClass('hilang');
      	}
    	}
    	else{
      	for (var i = offset+1; i <= offset+limit; i++) {
        		$('tbody tr:nth-child('+i+')').removeClass('hilang');
      	} 
    	}
  	}); 

  	$("li.page_prev").click(function(event) {
  		if (! $(this).hasClass('page_notActive')) {
	  		var hal_aktif = $('li.page_active').text();
	  		var hal_aktif = Number(hal_aktif);
	  		var hal_baru = hal_aktif - 1;

	  		$('li.page_active').removeClass('page_active');
	  		$('li#pg'+hal_baru).addClass('page_active');
	  		if (hal_baru == 1) {
	  			$(".paginasi ul li.page_prev").addClass('page_notActive');
	  		}
	  		else{
	  			$(".paginasi ul li.page_prev").removeClass('page_notActive');
	  		}

	  		$(".paginasi ul li.page_next").removeClass('page_notActive');


  			var offset = (hal_baru-1)*limit;
  			console.log('offset= '+offset);

  			$('tbody tr').attr('class','hilang');
  			// var newLimit = 0;
  			if ((total-offset) < limit) {
  		   	// newLimit = total-offset;
  		   	for (var i = offset+1; i <= total; i++) {
  		    		$('tbody tr:nth-child('+i+')').removeClass('hilang');
  		   	}
  		 	}
  		 	else{
  		   	for (var i = offset+1; i <= offset+limit; i++) {
  		     		$('tbody tr:nth-child('+i+')').removeClass('hilang');
  		   	} 
  		 	}

  		}
  	});

  	$("li.page_next").click(function(event) {
  		if (! $(this).hasClass('page_notActive')) {
	  		var hal_aktif = $('li.page_active').text();
	  		var hal_aktif = Number(hal_aktif);
	  		var hal_baru = hal_aktif + 1;

	  		$('li.page_active').removeClass('page_active');
	  		$('li#pg'+hal_baru).addClass('page_active');
	  		if (hal_baru == jml_page ) {
	   		$(".paginasi ul li.page_next").addClass('page_notActive');
	   	}
	   	else{
	   		$(".paginasi ul li.page_next").removeClass('page_notActive');	
	   	}

	   	$(".paginasi ul li.page_prev").removeClass('page_notActive');
	  		

  			var offset = (hal_baru-1)*limit;
  			console.log('offset= '+offset);

  			$('tbody tr').attr('class','hilang');
  			// var newLimit = 0;
  			if ((total-offset) < limit) {
  		   	// newLimit = total-offset;
  		   	for (var i = offset+1; i <= total; i++) {
  		    		$('tbody tr:nth-child('+i+')').removeClass('hilang');
  		   	}
  		 	}
  		 	else{
  		   	for (var i = offset+1; i <= offset+limit; i++) {
  		     		$('tbody tr:nth-child('+i+')').removeClass('hilang');
  		   	} 
  		 	}
  		}
  	});
}
