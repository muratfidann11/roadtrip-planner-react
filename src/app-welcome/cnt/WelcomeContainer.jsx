import { useState } from "react";
import { Button } from "primereact/button";

import { signInAnonymous } from "../../app-store/act/authActions";

export default function WelcomeContainer() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTest = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await signInAnonymous();

      setMessage(`Supabase bağlantısı başarılı.\nUser ID: ${data.user.id}`);
    } catch (error) {
      console.error(error);

      setMessage(`Supabase bağlantı hatası: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1>🍂 Roadtrip Planner</h1>

        <p>Arkadaş grubunuzla birlikte gezi planınızı oluşturmaya başlayın.</p>

        <Button
          label="Supabase Bağlantısını Test Et"
          icon="pi pi-check"
          loading={loading}
          onClick={handleTest}
        />

        {message && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "12px",
              background: "#f5f5f5",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
