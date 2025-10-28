import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostCard from "@/components/PostCard";
import { Post } from "@/service/types";

// Mock window.alert
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("PostCard Component", () => {
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

  test("should render post content correctly", () => {
    render(
      <PostCard
        post={mockPost}
        isAuthenticated={true}
        onLike={mockOnLike}
      />
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("This is a test post content")).toBeInTheDocument();
    expect(screen.getByText("Curtir")).toBeInTheDocument();
  });

  test("should call onLike when like button is clicked and user is authenticated", async () => {
    mockOnLike.mockResolvedValue(undefined);
    
    render(
      <PostCard
        post={mockPost}
        isAuthenticated={true}
        onLike={mockOnLike}
      />
    );

    const likeButton = screen.getByText("Curtir");
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(mockOnLike).toHaveBeenCalledWith(1);
    });
  });
});
