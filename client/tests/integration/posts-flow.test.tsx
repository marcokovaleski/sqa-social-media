import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/contexts/AuthContext";
import PostCard from "@/components/PostCard";
import { Post } from "@/service/types";

// Mock next/navigation
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

describe("Posts Flow Integration", () => {
  const mockPost: Post = {
    id: 1,
    title: "Test Post",
    body: "This is a test post content",
    liked: false
  };

  const mockOnLike = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should integrate post card with auth context", () => {
    render(
      <AuthProvider>
        <PostCard
          post={mockPost}
          isAuthenticated={true}
          onLike={mockOnLike}
        />
      </AuthProvider>
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  test("should handle unauthenticated user correctly", () => {
    render(
      <AuthProvider>
        <PostCard
          post={mockPost}
          isAuthenticated={false}
          onLike={mockOnLike}
        />
      </AuthProvider>
    );

    expect(screen.getByText("Curtir")).toBeInTheDocument();
  });
});
