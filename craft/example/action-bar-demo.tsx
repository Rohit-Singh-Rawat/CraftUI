"use client";

import * as React from "react";
import {
  Home,
  Search,
  Bell,
  User,
  ShoppingCart,
  Trash2,
  Check,
  X,
  Mail,
  Heart,
  Share2,
  Plus,
  Reply,
  Forward,
  Archive,
  MoreVertical,
  Flag,
  Printer,
  FolderOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ActionBarProvider,
  ActionBar,
  ActionBarLogo,
  ActionBarNav,
  ActionBarHeader,
  ActionBarTitle,
  ActionBarActions,
  ActionBarClose,
  ActionBarContent,
  ActionBarTrigger,
  ActionBarSeparator,
} from "@/craft/components/action-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitch from "@/components/navigation/theme-toggle";
import Logo from "@/components/navigation/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * DOCK MODE - Persistent bottom navigation
 * Always visible, acts like mobile tab bar or macOS dock
 */
export function DockModeDemo() {
  const [showDock, setShowDock] = React.useState(true);

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-center gap-2.5">
        <Switch
          id="show-dock"
          checked={showDock}
          onCheckedChange={setShowDock}
        />
        <Label htmlFor="show-dock" className="cursor-pointer text-sm">
          Show Dock
        </Label>
      </div>

      {showDock && (
        <ActionBarProvider mode="dock">
          <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
            <ActionBarLogo>
              <Logo className="size-8 rounded-full bg-black mr-1" />
            </ActionBarLogo>

            <ActionBarNav className="gap-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Home className="size-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Search className="size-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Bell className="size-4" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
            </ActionBarNav>

            <ActionBarActions className="gap-0">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <User className="size-4" />
              </Button>
            </ActionBarActions>
          </ActionBar>
        </ActionBarProvider>
      )}
    </div>
  );
}

/**
 * CONTEXTUAL MODE - Shopping Cart
 * Appears when items are in cart
 */
export function ShoppingCartDemo() {
  const [cartItems, setCartItems] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    setIsOpen(false);
    setCartItems(0);
  };

  const handleClear = () => {
    setCartItems(0);
    setIsOpen(false);
  };

  return (
    <div className="relative  ">
      <div className="flex justify-center">
        <Button
          onClick={() => {
            setCartItems((prev) => prev + 1);
            setIsOpen(true);
          }}
          className="rounded-full text-xs h-8 px-4"
        >
          Add to Cart
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
          <ActionBarContent className="gap-0">
            <ActionBarHeader className="h-fit gap-2 px-2">
              <ShoppingCart className="size-4 text-muted-foreground" />
              <ActionBarTitle className="font-normal text-sm">
                {cartItems} items in cart
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>

          <ActionBarActions className="gap-3">
            <Button
              size="sm"
              onClick={handleCheckout}
              className="rounded-full text-sm h-8 px-4"
            >
              Checkout
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleClear}
              className="rounded-full text-sm p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
            >
              Clear
            </Button>
          </ActionBarActions>
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * CONTEXTUAL MODE - Bulk Selection
 * Appears when items are selected
 */
export function BulkSelectionDemo() {
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = () => {
    const newCount = selectedCount + 1;
    setSelectedCount(newCount);
    setIsOpen(true);
  };

  const handleDelete = () => {
    console.log(`Deleting ${selectedCount} items...`);
    setSelectedCount(0);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedCount(0);
    setIsOpen(false);
  };

  return (
    <div className="relative  pb-[28px]">
      <div className="flex justify-center gap-2">
        <Button
          onClick={handleSelect}
          variant="outline"
          className="rounded-full text-xs h-8 px-4"
        >
          Select Item ({selectedCount})
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
          <ActionBarContent className="gap-0">
            <ActionBarClose className="hover:bg-accent rounded-full size-8" />
            <ActionBarHeader className="h-fit px-2">
              <ActionBarTitle className="font-normal text-sm">
                {selectedCount} selected
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>

          <ActionBarActions className="gap-0">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              className="rounded-full text-sm h-8 gap-1 px-4"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="rounded-full text-sm p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
            >
              Cancel
            </Button>
          </ActionBarActions>
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * CONTEXTUAL MODE - Success Notification
 * Auto-dismiss after 5 seconds
 */
export function SuccessNotificationDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  const triggerNotification = () => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 5000);
  };

  return (
    <div className="relative  pb-[28px]">
      <div className="flex justify-center">
        <Button
          onClick={triggerNotification}
          className="rounded-full text-xs h-8 px-4"
        >
          Save Changes
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
          <ActionBarContent className="gap-0">
            <ActionBarHeader className="h-fit gap-2 px-2">
              <Check className="size-4 text-green-600" />
              <ActionBarTitle className="font-normal text-sm">
                Changes saved successfully
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>

          <ActionBarActions className="gap-0">
            <ActionBarClose className="hover:bg-accent rounded-full size-8" />
          </ActionBarActions>
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * EDGE POSITIONS - Top, Left, Right
 */
export function EdgePositionsDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<"top" | "left" | "right">(
    "top",
  );

  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={() => {
          setPosition("top");
          setIsOpen(!isOpen);
        }}
        variant={position === "top" && isOpen ? "default" : "outline"}
        size="sm"
        className="text-xs h-8 px-3"
      >
        Top
      </Button>
      <Button
        onClick={() => {
          setPosition("left");
          setIsOpen(!isOpen);
        }}
        variant={position === "left" && isOpen ? "default" : "outline"}
        size="sm"
        className="text-xs h-8 px-3"
      >
        Left
      </Button>
      <Button
        onClick={() => {
          setPosition("right");
          setIsOpen(!isOpen);
        }}
        variant={position === "right" && isOpen ? "default" : "outline"}
        size="sm"
        className="text-xs h-8 px-3"
      >
        Right
      </Button>

      <ActionBarProvider
        mode="contextual"
        position={position}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {position === "left" || position === "right" ? (
          <ActionBar className="w-auto p-1">
            <ActionBarNav className="flex-col gap-0">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full size-9 hover:bg-accent"
              >
                <Home className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full size-9 hover:bg-accent"
              >
                <Search className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full size-9 hover:bg-accent"
              >
                <Bell className="size-5" />
              </Button>
            </ActionBarNav>

            <ActionBarSeparator />

            <ActionBarClose className="hover:bg-accent rounded-full size-8" />
          </ActionBar>
        ) : (
          <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
            <ActionBarContent className="gap-0">
              <ActionBarHeader className="h-fit gap-2 px-2">
                <Bell className="size-4 text-muted-foreground" />
                <ActionBarTitle className="font-normal text-sm capitalize">
                  {position}
                </ActionBarTitle>
              </ActionBarHeader>
            </ActionBarContent>

            <ActionBarActions className="gap-0">
              <Button size="sm" className="rounded-full text-sm h-8 px-4">
                Action
              </Button>
              <ActionBarClose className="hover:bg-accent rounded-full size-8" />
            </ActionBarActions>
          </ActionBar>
        )}
      </ActionBarProvider>
    </div>
  );
}

/**
 * POSITION DEMOS - Show different positions
 */
type Position =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export function PositionDemo() {
  const [activePosition, setActivePosition] =
    React.useState<Position>("bottom");
  const [isOpen, setIsOpen] = React.useState(false);

  const positions: Position[] = [
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  const showPosition = (position: Position) => {
    setActivePosition(position);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {positions.map((position) => (
          <Button
            key={position}
            onClick={() => showPosition(position)}
            variant="outline"
            size="sm"
            className="capitalize"
          >
            {position}
          </Button>
        ))}
      </div>

      <ActionBarProvider
        mode="contextual"
        position={activePosition}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
          <ActionBarContent className="gap-0">
            <ActionBarHeader className="h-fit px-2">
              <Bell className="size-4 text-muted-foreground" />
              <ActionBarTitle className="font-normal text-sm">
                Position: {activePosition}
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>
          <ActionBarClose className="hover:bg-accent rounded-full size-8" />
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * VERTICAL SIDEBAR DEMO - Left/Right combined
 */
export function VerticalSidebarDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<"left" | "right">("left");

  return (
    <div className="flex justify-center gap-3">
      <Button
        onClick={() => {
          setPosition("left");
          setIsOpen(!isOpen);
        }}
        variant={position === "left" && isOpen ? "default" : "outline"}
        size="sm"
      >
        Left
      </Button>
      <Button
        onClick={() => {
          setPosition("right");
          setIsOpen(!isOpen);
        }}
        variant={position === "right" && isOpen ? "default" : "outline"}
        size="sm"
      >
        Right
      </Button>

      <ActionBarProvider
        mode="contextual"
        position={position}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="w-auto p-1">
          <ActionBarLogo>
            <Logo className="size-8 rounded-full bg-black" />
          </ActionBarLogo>

          <ActionBarSeparator />

          <ActionBarNav className="flex-col gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Home className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Bell className="size-5" />
            </Button>
          </ActionBarNav>

          <ActionBarSeparator />

          <ActionBarClose className="hover:bg-accent rounded-full size-8" />
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * VERTICAL SIDEBAR DEMO - Right position with vertical layout
 */
export function VerticalRightDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm">
          {isOpen ? "Hide" : "Show"} Right Actions
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        position="right"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="w-auto p-1">
          <ActionBarActions>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Plus className="size-5" />
            </Button>
          </ActionBarActions>

          <ActionBarSeparator />

          <ActionBarNav className="flex-col gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Heart className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <ShoppingCart className="size-5" />
            </Button>
          </ActionBarNav>

          <ActionBarSeparator />

          <ActionBarClose className="hover:bg-accent rounded-full size-8" />
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * DOCK MODE with different positions
 */
export function DockPositionDemo() {
  const [position, setPosition] = React.useState<Position>("bottom");
  const [showDock, setShowDock] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setPosition("top")}
            variant={position === "top" ? "default" : "outline"}
            size="sm"
          >
            Top
          </Button>
          <Button
            onClick={() => setPosition("bottom")}
            variant={position === "bottom" ? "default" : "outline"}
            size="sm"
          >
            Bottom
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <Switch
            id="show-dock-position"
            checked={showDock}
            onCheckedChange={setShowDock}
          />
          <Label htmlFor="show-dock-position" className="cursor-pointer text-sm">
            Show Dock
          </Label>
        </div>
      </div>

      {showDock && (
        <ActionBarProvider mode="dock" position={position}>
          <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
            <ActionBarLogo>
              <Logo className="size-8 rounded-full bg-black mr-1" />
            </ActionBarLogo>

            <ActionBarNav className="gap-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Home className="size-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Search className="size-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-sm font-normal p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <Bell className="size-4" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
            </ActionBarNav>

            <ActionBarActions className="gap-0">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:bg-accent text-muted-foreground hover:text-muted-foreground"
              >
                <User className="size-4" />
              </Button>
            </ActionBarActions>
          </ActionBar>
        </ActionBarProvider>
      )}
    </div>
  );
}

/**
 * OFFSET DEMO - Simple offset control
 */
export function OffsetDemo() {
  const [offset, setOffset] = React.useState(16);
  const [isOpen, setIsOpen] = React.useState(false);

  const showDemo = () => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium min-w-[80px]">{offset}px</label>
        <input
          type="range"
          min="8"
          max="80"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="flex-1"
        />
        <Button onClick={showDemo} size="sm">
          Show
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        position="bottom"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar
          offset={offset}
          className="h-auto w-auto rounded-full p-2.5 sm:min-w-0"
        >
          <ActionBarContent className="gap-2">
            <ActionBarHeader className="h-fit px-2">
              <Check className="size-4 text-green-600" />
              <ActionBarTitle className="font-normal text-sm">
                Offset: {offset}px
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>
          <ActionBarClose className="hover:bg-accent rounded-full size-8" />
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * VERTICAL OFFSET DEMO - Left/Right with custom offset and height
 */
export function VerticalOffsetDemo() {
  const [offset, setOffset] = React.useState(16);
  const [maxHeight, setMaxHeight] = React.useState(600);
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<"left" | "right">("left");

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Offset: {offset}px</label>
          <input
            type="range"
            min="8"
            max="80"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Max Height: {maxHeight}px
          </label>
          <input
            type="range"
            min="300"
            max="800"
            value={maxHeight}
            onChange={(e) => setMaxHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button
          onClick={() => {
            setPosition("left");
            setIsOpen(!isOpen);
          }}
          variant={position === "left" && isOpen ? "default" : "outline"}
          size="sm"
        >
          Show Left
        </Button>
        <Button
          onClick={() => {
            setPosition("right");
            setIsOpen(!isOpen);
          }}
          variant={position === "right" && isOpen ? "default" : "outline"}
          size="sm"
        >
          Show Right
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        position={position}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar
          offset={offset}
          maxHeight={`${maxHeight}px`}
          className="w-auto p-1"
        >
          <ActionBarLogo>
            <Logo className="size-8 rounded-full bg-black" />
          </ActionBarLogo>

          <ActionBarSeparator />

          <ActionBarNav className="flex-col gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Home className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-accent"
            >
              <Bell className="size-5" />
            </Button>
          </ActionBarNav>

          <ActionBarSeparator />

          <ActionBarClose className="hover:bg-accent rounded-full size-8" />
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}

/**
 * EMAIL/MESSAGING TOOLBAR DEMO
 * Shows contextual action bar with individual actions and dropdown menu
 */
export function EmailToolbarDemo() {
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = () => {
    const newCount = selectedCount + 1;
    setSelectedCount(newCount);
    setIsOpen(true);
  };

  const handleAction = (action: string) => {
    console.log(`${action} ${selectedCount} email(s)`);
  };

  const handleClear = () => {
    setSelectedCount(0);
    setIsOpen(false);
  };

  return (
    <div className="relative pb-[28px]">
      <div className="flex justify-center gap-2">
        <Button
          onClick={handleSelect}
          variant="outline"
          className="rounded-full text-xs h-8 px-4"
        >
          <Mail className="size-3 mr-1" />
          Select Email ({selectedCount})
        </Button>
      </div>

      <ActionBarProvider
        mode="contextual"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ActionBar className="h-auto w-auto rounded-full p-2.5 sm:min-w-0">
          <ActionBarContent className="gap-0">
            <ActionBarHeader className="h-fit px-2">
              <ActionBarTitle className="font-normal text-sm">
                {selectedCount} selected
              </ActionBarTitle>
            </ActionBarHeader>
          </ActionBarContent>

          <ActionBarActions className="gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAction("Reply to")}
              className="rounded-full text-sm h-8 gap-1 px-3"
            >
              <Reply className="size-4" />
              <span className="hidden sm:inline">Reply</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAction("Forward")}
              className="rounded-full text-sm h-8 gap-1 px-3"
            >
              <Forward className="size-4" />
              <span className="hidden sm:inline">Forward</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAction("Archive")}
              className="rounded-full text-sm h-8 gap-1 px-3"
            >
              <Archive className="size-4" />
              <span className="hidden sm:inline">Archive</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full text-sm h-8 px-2"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl min-w-[180px]"
              >
                <DropdownMenuItem
                  onClick={() => handleAction("Mark as read")}
                  className="rounded-xl text-sm gap-3"
                >
                  <Mail className="size-4" />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("Star")}
                  className="rounded-xl text-sm gap-3"
                >
                  <Star className="size-4" />
                  Star
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("Flag")}
                  className="rounded-xl text-sm gap-3"
                >
                  <Flag className="size-4" />
                  Flag
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAction("Move to folder")}
                  className="rounded-xl text-sm gap-3"
                >
                  <FolderOpen className="size-4" />
                  Move to Folder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("Print")}
                  className="rounded-xl text-sm gap-3"
                >
                  <Printer className="size-4" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAction("Delete")}
                  className="rounded-xl text-sm gap-3 text-destructive"
                  variant="destructive"
                >
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeSwitch />

            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="rounded-full text-sm p-2 hover:bg-accent text-muted-foreground hover:text-muted-foreground"
            >
              <X className="size-4" />
            </Button>
          </ActionBarActions>
        </ActionBar>
      </ActionBarProvider>
    </div>
  );
}
const DEMOS = [
  {
    id: "dock",
    title: "Dock",
    description: "Persistent navigation that stays docked to an edge.",
    component: DockModeDemo,
  },
  {
    id: "cart",
    title: "Cart",
    description: "Contextual bar that appears when something is added.",
    component: ShoppingCartDemo,
  },
  {
    id: "selection",
    title: "Selection",
    description: "Bulk actions for multi-select workflows.",
    component: BulkSelectionDemo,
  },
  {
    id: "notification",
    title: "Notification",
    description: "Transient feedback with a dismiss action.",
    component: SuccessNotificationDemo,
  },
  {
    id: "positions",
    title: "Positions",
    description: "Top, left, and right edge placements.",
    component: EdgePositionsDemo,
  },
  {
    id: "email",
    title: "Email toolbar",
    description: "Rich actions with overflow menu support.",
    component: EmailToolbarDemo,
  },
] as const;

function DemoStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-2xl border border-border/60 bg-linear-to-b from-muted/35 to-background [transform:translateZ(0)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,var(--foreground)_0%,transparent_58%)] opacity-[0.04]"
      />
      <div className="relative flex h-full min-h-[360px] items-center justify-center p-6 sm:p-10">
        {children}
      </div>
    </div>
  );
}

const ActionBarDemos = () => {
  return (
    <div className="flex h-full w-full min-h-0 flex-col px-4 sm:px-6 md:px-8">
      <Tabs defaultValue="dock" className="flex h-full min-h-0 w-full flex-col gap-4">
        <TabsList className="mx-auto h-auto w-full max-w-3xl flex-wrap justify-center gap-1 rounded-full bg-muted/70 p-1">
          {DEMOS.map((demo) => (
            <TabsTrigger
              key={demo.id}
              value={demo.id}
              className="rounded-full px-3 py-1.5 text-xs sm:px-4 sm:text-sm"
            >
              {demo.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {DEMOS.map((demo) => {
          const Demo = demo.component;

          return (
            <TabsContent
              key={demo.id}
              value={demo.id}
              className="mt-0 flex min-h-0 flex-1 flex-col gap-3 focus-visible:outline-none"
            >
              <p className="text-center text-muted-foreground text-sm">
                {demo.description}
              </p>
              <DemoStage>
                <Demo />
              </DemoStage>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ActionBarDemos;
