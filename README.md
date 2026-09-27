# Roadtrip Planner

React + Vite + PrimeReact + Redux Toolkit ile hazırlanmış arkadaş grubu rota planlama uygulaması.

## Çalıştırma

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Modül yapısı

Her uygulama ekranı aşağıdaki katmanlara ayrılmıştır:

- `cnt` — container / ekran bileşeni
- `cmp` — tekrar kullanılabilir component alanı
- `act` — Redux action alanı
- `rdc` — reducer / slice alanı
- `cns` — constants alanı

Ekran modülleri:

- `app-welcome`
- `app-date-pick`
- `app-city-pick`
- `app-category-pick`
- `app-vote`
- `app-result`

Redux store: `src/app-store`

## Notlar

- Oylama 1–5 yıldızdır.
- Tüm aktif seçenekler puanlanmadan tur tamamlanamaz.
- En yüksek puanda eşitlik varsa düşük puanlı seçenekler elenir ve yeni tur başlar.
- Tek seçenek kaldığında kategori sonucu Redux store'a yazılır.
- Son kategori tamamlandığında final rota ekranı oluşur.
- Görseller ve Google Maps bağlantıları demo verisidir; gerçek Google Places verisi değildir.
- Çok kullanıcılı gerçek zamanlı oylama için sonraki aşamada Supabase/Firebase gibi bir realtime backend bağlanabilir.
