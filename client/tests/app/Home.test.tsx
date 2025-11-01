import { AuthProvider } from "../../src/contexts/AuthContext";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import api from "../../src/service/api";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        pathname: "/",
    }),
    usePathname: () => "/",
}));

jest.mock("../../src/service/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("App - Home", () => {
    test("deve renderizar o número de posts corretamente de acordo com a quantidade de posts retornada pela API", async () => {
        const mockResponse = {
            data: {
                posts: [
                    { id: 1, title: "Post 1", body: "Content 1", liked: false },
                    { id: 2, title: "Post 2", body: "Content 2", liked: false },
                ],
            },
        };

        mockedApi.get.mockResolvedValueOnce(mockResponse);

        const { asFragment } = render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        await screen.findAllByRole("listitem");
        expect(screen.getAllByRole("listitem").length).toBe(2);
        expect(asFragment()).toMatchSnapshot();
    });

    test("deve exibir 'Carregando posts...' durante o carregamento inicial", async () => {
        // Mock da API que retorna uma promise pendente
        mockedApi.get.mockReturnValueOnce(
            new Promise(() => { }) as any
        );

        render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        // Verifica que o texto de carregamento está presente
        expect(screen.getByText("Carregando posts...")).toBeInTheDocument();

        // Verifica que nenhum post foi renderizado ainda
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    test("deve exibir mensagem de erro quando a requisição de posts falha", async () => {
        // Mock da API que rejeita a promise
        mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

        render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        // Aguarda a resolução da promise e o estado de erro ser renderizado
        await waitFor(() => {
            expect(
                screen.getByText("Erro ao carregar posts. Tente novamente mais tarde.")
            ).toBeInTheDocument();
        });

        // Verifica que nenhum post foi renderizado
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
});