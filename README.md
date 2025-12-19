<h1>Instalasi</h1>
1. Clone repository

```bash
git clone https://github.com/vedianbnka/GLI_TechnicalTest.git
cd GLI_TechnicalTest
```

2. Buat database MySQL dengan nama:
```bash
gli_technical_test
```

4. Jalankan backend
```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

4. Buka tab terminal baru di folder GLI_TechnicalTest dan jalankan frontend
```bash
cd frontend
npm i
npm run dev
```

<h1>Penggunaan API ATK</h1>

<p><b>Base URL:</b></p>
<p>http://localhost:8080</p>

<hr>

<h2>GET /api/atk</h2>

<p><b>Deskripsi</b><br>
Menampilkan seluruh daftar ATK yang tersimpan di database.</p>

<p><b>Response</b></p>
<pre>
[
  {
    id: string,
    nama: string,
    jenis: string,
    qty: int
  }
]
</pre>

<hr>

<h2>POST /api/atk</h2>

<p><b>Deskripsi</b><br>
Membuat data ATK baru ke dalam database.<br>
Field <code>qty</code> harus berupa angka positif.</p>

<p><b>Request Body</b></p>
<pre>
{
  nama: string,
  jenis: string,
  qty: int
}
</pre>

<p><b>Response</b></p>
<pre>
{
  id: string,
  nama: string,
  jenis: string,
  qty: int
}
</pre>

<hr>

<h2>PUT /api/atk/{id}</h2>

<p><b>Deskripsi</b><br>
Mengedit data ATK yang sudah ada.<br>
Field <code>qty</code> tidak boleh bernilai negatif.</p>

<p><b>Path Parameter</b></p>
<ul>
  <li><b>id</b> : ID ATK yang ingin diperbarui</li>
</ul>

<p><b>Request Body (opsional)</b></p>
<pre>
{
  nama?: string,
  jenis?: string,
  qty?: int
}
</pre>

<p><b>Response</b></p>
<pre>
{
  id: string,
  nama: string,
  jenis: string,
  qty: int
}
</pre>

<hr>

<h2>DELETE /api/atk/{id}</h2>

<p><b>Deskripsi</b><br>
Menghapus data ATK dari database.</p>

<p><b>Path Parameter</b></p>
<ul>
  <li><b>id</b> : ID ATK yang ingin dihapus</li>
</ul>

<p><b>Response</b></p>
<pre>
{
  message: string
}
</pre>
