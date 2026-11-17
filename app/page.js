import Confetti from "./components/Confetti";

export const revalidate = 60;

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?page=1&per_page=1&strategy=new`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return null;
    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await getTotalContents();

  return (
    <main className="construction">
      <Confetti />
      <span className="badge">🚧 Em Construção</span>
      <h1>
        Estou neste exato momento reconstruindo o TabNew, um lugar na internet
        para quem trabalha com tecnologia e precisa consumir conteúdos com valor
        concreto
      </h1>
      <p className="total">
        {total !== null ? (
          <>
            <strong>{total.toLocaleString("pt-BR")}</strong> conteúdos
            publicados no TabNews
          </>
        ) : (
          "Não foi possível carregar o total de conteúdos agora."
        )}
      </p>
      <a className="link" href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Acesse o site oficial do TabNews →
      </a>
    </main>
  );
}
