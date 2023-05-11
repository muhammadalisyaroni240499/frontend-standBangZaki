// Navbar
const toggle = document.querySelector('nav .menu-toggle');
const ul = document.querySelector('nav ul');
const mBeranda = document.getElementById('menu-beranda');
const mProduk = document.getElementById('menu-produk');
const mLayanan = document.getElementById('menu-layanan');
const mTentangKami = document.getElementById('menu-tentang-kami');
const inputToggle = document.querySelector('nav .menu-toggle input');
toggle.addEventListener('click', function(){
	ul.classList.toggle('slide');
	// document.body.classList.toggle('no-scroll');
});

mBeranda.addEventListener('click', function(){
	ul.classList.toggle('slide');
	inputToggle.checked = false;
});
mProduk.addEventListener('click', function(){
	ul.classList.toggle('slide');
	inputToggle.checked = false;
});
mLayanan.addEventListener('click', function(){
	ul.classList.toggle('slide');
	inputToggle.checked = false;
});
mTentangKami.addEventListener('click', function(){
	ul.classList.toggle('slide');
	inputToggle.checked = false;
});





// Product

// Membuat 4 produk awal
const produkLokalAwal =[
{
	nama_produk : 'Tahu Sumedang',
	harga : 'Rp.10.000,00',
	komposisi : 'kedelai, air, dsb.',
	image : 'asset/img/produk/tahu.jpg'
},
{
	nama_produk : 'Pisang Kipas',
	harga : 'Rp.10.000,00',
	komposisi : 'pisang, tepung, dsb.',
	image : 'asset/img/produk/pisang.jpg'
},
{
	nama_produk : 'Somai',
	harga : 'Rp.10.000,00',
	komposisi : 'daging, tepung, dsb.',
	image : 'asset/img/produk/somai.jpg'
},
{
	nama_produk : 'Es Krim',
	harga : 'Rp.7.000,00',
	komposisi : 'Buah, coklat, gelatin, dsb',
	image : 'asset/img/produk/eskrim.jpg'
}
];

const key_lokal = 'produkLokal';
if (localStorage.getItem(key_lokal) === null) {
	localStorage.setItem(key_lokal, JSON.stringify(produkLokalAwal));
}

const produkLokal = JSON.parse(localStorage.getItem(key_lokal));

const articleProduct = document.querySelector('article#produk .listProduk');
const pTambahProduk = articleProduct.querySelector('.bTambahProduk');
for(item of produkLokal){
	const section = document.createElement('section');

	const imgP = document.createElement('img');
	imgP.setAttribute('src', item.image);
	section.appendChild(imgP);

	// Nama Produk
	const namaP = document.createElement('h3');
	const textnamaP = document.createTextNode(item.nama_produk);
	namaP.appendChild(textnamaP);
	section.appendChild(namaP);

	// harga
	const hargaP = document.createElement('h4');
	const texthargaP = document.createTextNode(item.harga + "/porsi");
	hargaP.appendChild(texthargaP);
	section.appendChild(hargaP);

	// Komposisi
	const komposisiP = document.createElement('p');
	const textkomposisiP = document.createTextNode("Komposisi bahan  : " + item.komposisi);
	komposisiP.appendChild(textkomposisiP);
	section.appendChild(komposisiP);

	articleProduct.insertBefore(section, pTambahProduk);
}



// form tambah produk
const bTambahProduk = document.querySelector('#produk .listProduk .bTambahProduk');
const fTambahProduk = document.querySelector('.fTambahProduk');
const close = document.querySelector('i');
bTambahProduk.addEventListener('click', function(){
	fTambahProduk.style.display = 'flex';
});
close.addEventListener('click', function(){
	fTambahProduk.style.display = 'none';
});



// mengambil nilai input
const bSimpan = fTambahProduk.querySelector('button');
const key_session = 'produkSession';
let tambahanProdukSession = {
	namaP: null,
	hargaP: null,
	komposisiP: null,
	imgP: null
};
bSimpan.addEventListener('click', function(){
	const namaP = fTambahProduk.querySelector('#namaP');
	const hargaP = fTambahProduk.querySelector('#hargaP');
	const komposisiP = fTambahProduk.querySelector('#komposisiP');
	if (namaP.value == "" || hargaP.value == "" || komposisiP.value == "") {
		alert("Mohon isi semua data produk!");
		return;
	}
	let tambahanProduk = null;
	tambahanProdukSession = {
		namaP: namaP.value,
		hargaP: hargaP.value,
		komposisiP: komposisiP.value,
		imgP: 'asset/img/produk/new.jpg'
	};
	if (sessionStorage.getItem(key_session) === null) {
		tambahanProduk = [];
	} else{
		tambahanProduk = JSON.parse(sessionStorage.getItem(key_session));	
	}
	if (confirm("Anda yakin menyimpan produk ini?") == true) {
		tambahanProduk.push(tambahanProdukSession);
		sessionStorage.setItem(key_session, JSON.stringify(tambahanProduk));
	}
	fTambahProduk.style.display = 'none';
	location.reload();
});

if (sessionStorage.getItem(key_session) !== null) {
	const produkSession = JSON.parse(sessionStorage.getItem(key_session));

	for(item of produkSession){
		const section = document.createElement('section');
		let imgP = document.createElement('img');
		imgP.setAttribute('src', item.imgP);
		section.appendChild(imgP);
		// Membuat nama produk
		const namaP = document.createElement('h3');
		const textnamaP = document.createTextNode(item.namaP);
		namaP.appendChild(textnamaP);
		section.appendChild(namaP);
		// Membuat harga
		const hargaP = document.createElement('h4');
		const texthargaP = document.createTextNode(item.hargaP + "/porsi");
		hargaP.appendChild(texthargaP);
		section.appendChild(hargaP);

		const komposisiP = document.createElement('p');
		const textkomposisiP = document.createTextNode("Komposisi bahan  : " + item.komposisiP);
		komposisiP.appendChild(textkomposisiP);
		section.appendChild(komposisiP);

		articleProduct.insertBefore(section, pTambahProduk);
	}

}





// LAYANAN

// menghitung harga bayar dan jarak
const layanan = document.getElementById('layanan');
const left = layanan.querySelector('.desc-layanan .left');
const jarak = layanan.querySelector('#jarak');
const button_jarak = layanan.querySelector('#button_jarak');
let hasil = 0;
button_jarak.addEventListener('click', function(){
	let jarakInt = parseFloat(jarak.value);
	if (jarakInt <= 1) {
		hasil = 2000;
	} else {
		hasil = jarakInt * 2000;
	}

	const Ongkir_lama = document.getElementById('ongkir');
	const Ongkir = document.createElement('h5');
	const textOngkir = document.createTextNode('Ongkos kirim Rp.' + String(hasil));
	Ongkir.appendChild(textOngkir);

	if (Ongkir_lama === null) {
		Ongkir.setAttribute("id", "ongkir");
		left.appendChild(Ongkir)
	} else{
		const parent = layanan.querySelector('.desc-layanan .left')
		parent.replaceChild(Ongkir, Ongkir_lama);
	}

	// console.log(Ongkir_lama);
	
});