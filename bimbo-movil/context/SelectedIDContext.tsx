// Contexto para el ID seleccionado para realizar el conteo.
import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";

type SelectedIDContextType = {
  selectedID: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  urlContado: string;
  setUrlContado: React.Dispatch<React.SetStateAction<string>>;
  pallets: number;
  boxes: number;
  idProd: number;
};

// Creación del contexto
const SelectedIDContext = createContext<SelectedIDContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const SelectedIDProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedID, setSelectedID] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [urlContado, setUrlContado] = useState("");
  const [pallets, setPallets] = useState(0);
  const [boxes, setBoxes] = useState(0);
  const [idProd, setIdProd] = useState(0);

  async function getInfo(selectedID: string) {
    try {
      const response = await fetch(
        `http://${SERVER}/conteo/infoPosicion/${selectedID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPallets(data.Pallets);
      setBoxes(data.CajasFisico);
      setIdProd(data.IdProducto);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  }

  useEffect(() => {
    getInfo(selectedID);
  }, [selectedID]);

  return (
    <SelectedIDContext.Provider
      value={{
        selectedID,
        setSelectedID,
        imageUrl,
        setImageUrl,
        urlContado,
        setUrlContado,
        pallets,
        boxes,
        idProd,
      }}
    >
      {children}
    </SelectedIDContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSelectedID = (): SelectedIDContextType => {
  const context = useContext(SelectedIDContext);
  if (!context) {
    throw new Error(
      "useSelectedID debe usarse dentro de un SelectedIDProvider"
    );
  }
  return context;
};
