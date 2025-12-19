import api from "../lib/axios";
import { useState, useEffect } from "react";
import type { Atk } from "../types/Atk";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const Home = () => {
  const [atkData, setAtkData] = useState<Atk[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formAtk, setFormAtk] = useState<Atk>({
    id: "",
    nama: "",
    jenis: "",
    qty: 0,
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchAtkData = async () => {
    try {
      setLoading(true);
      const response = await api.get<Atk[]>("/api/atk");
      setAtkData(response.data);
    } catch (error) {
      setError("Kesalahan server.");
      console.error("Error saat get all data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtkData();
  }, []);

  const addData = async () => {
    try {
      setLoading(true);

      if (!formAtk.nama.trim() || !formAtk.jenis.trim()) {
        setError("Nama dan jenis wajib diisi.");
        return;
      }

      if (formAtk.qty == null || isNaN(formAtk.qty) || formAtk.qty <= 0) {
        setError("Qty harus angka positif.");
        return;
      }

      const payload = {
        nama: formAtk.nama.trim(),
        jenis: formAtk.jenis.trim(),
        qty: Number(formAtk.qty),
      };

      console.log(payload);

      await api.post("/api/atk", payload);

      setFormAtk({ id: "", nama: "", jenis: "", qty: 0 });

      await fetchAtkData();
    } catch (error) {
      setError("Gagal menambahkan data.");
      console.error("Error saat menambahkan data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      if (!formAtk.id) return;
      setLoading(true);
      await api.put(`/api/atk/${formAtk.id}`, formAtk);
      setFormAtk({ id: "", nama: "", jenis: "", qty: 0 });
      await fetchAtkData();
    } catch (error) {
      setError("Gagal memperbarui data.");
      console.error("Error saat memperbarui data:", error);
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      if (!deleteId) return;
      setLoading(true);
      await api.delete(`/api/atk/${deleteId}`);
      closeDeleteModal();
      await fetchAtkData();
    } catch (error) {
      setError("Gagal menghapus data.");
      console.error("Error saat menghapus data:", error);
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const headerCellClass =
    "py-3 w-1/5 px-4 text-left text-sm font-semibold text-gray-700 border border-gray-300";
  const bodyCellClass =
    "py-3 w-1/5 px-4 text-sm text-gray-800 border border-gray-300";
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500";

  return (
    <>
      {loading && <Loading />}
      {/* Main Container */}
      <div className="min-h-screen bg-gray-100 py-12">
        {/* Error Notification */}
        {error && (
          <div className="fixed right-6 top-6 z-50 flex gap-3 rounded-lg bg-red-50 hover:bg-red-100 shadow-3xl border border-red-200 px-4 py-4">
            <div className="text-md text-red-700">{error}</div>
            <button
              className="ml-auto text-red-600 hover:text-red-700 text-lg font-semibold"
              onClick={() => setError(null)}
            >
              x
            </button>
          </div>
        )}
        <div className="mx-auto flex flex-col md:flex-row gap-6 max-w-[90%]">
          {/* Table Section */}
          <div className="w-full md:w-[70%] order-2 md:order-1">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
              <h1 className="text-xl md:text-3xl font-semibold text-center mb-6">
                Alat Tulis Kantor (ATK) Inventory
              </h1>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={headerCellClass}>ID</th>
                      <th className={headerCellClass}>Nama</th>
                      <th className={headerCellClass}>Jenis</th>
                      <th className={headerCellClass}>Qty</th>
                      <th className={headerCellClass}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atkData.map((atk) => (
                      <tr key={atk.id} className="hover:bg-gray-50">
                        <td className={bodyCellClass}>{atk.id}</td>
                        <td className={bodyCellClass}>{atk.nama}</td>
                        <td className={bodyCellClass}>{atk.jenis}</td>
                        <td className={bodyCellClass}>{atk.qty}</td>
                        <td className={bodyCellClass}>
                          <div className="flex flex-col md:flex-row gap-2">
                            <button
                              className="px-3 py-2 rounded text-sm text-white bg-blue-500 hover:bg-blue-600"
                              onClick={(e) => setFormAtk(atk)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-2 rounded text-sm text-white bg-red-500 hover:bg-red-600"
                              onClick={() => openDeleteModal(atk.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-[30%] order-1 md:order-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
              <h1 className="text-xl md:text-3xl font-semibold text-center mb-4">
                {formAtk.id ? "Update ATK Item" : "Tambah ATK Item"}
              </h1>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-medium text-sm">Nama ATK</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    value={formAtk.nama}
                    className={inputClass}
                    onChange={(e) =>
                      setFormAtk({ ...formAtk, nama: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="font-medium text-sm">Jenis ATK</label>
                  <input
                    type="text"
                    placeholder="Jenis"
                    value={formAtk.jenis}
                    className={inputClass}
                    onChange={(e) =>
                      setFormAtk({ ...formAtk, jenis: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="font-medium text-sm">Jumlah Qty</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    inputMode="numeric"
                    min={0}
                    value={formAtk.qty}
                    className={inputClass}
                    onChange={(e) =>
                      setFormAtk({ ...formAtk, qty: Number(e.target.value) })
                    }
                    required
                  />
                </div>
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={formAtk.id ? updateData : addData}
                >
                  {formAtk.id ? "Update Data" : "Tambah Data"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showDeleteModal}
        title="Konfirmasi Hapus"
        message="Yakin ingin hapus data?"
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        onCancel={closeDeleteModal}
        onConfirm={deleteData}
      />
    </>
  );
};

export default Home;
