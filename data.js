const FOTO_FOLDER = "photos/25x50/";

const motifList = [
  "Aurora blue",
  "Aurora bg",
  "Anaheim gn",
  "Autumn bl",
  "Camrose gy",
  "Camrose wt",
  "Interlaken tc",
  "Livia wt",
  "Maldives pk",
  "Maxine bl",
  "Padova cm",
  "Rhein bk",
  "Seine wt",
  "Waikiki bg",
  "Waikiki gy"
].map(nama => ({
  nama: nama,
  foto: FOTO_FOLDER + nama.toLowerCase().replace(/ /g, "-") + ".jpg"
}));
