'use client';

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useRef,
	useMemo,
	useEffect,
	type ReactNode,
} from 'react';

type RestartFn = () => void;

interface PanelContextValue {
	readonly isMaximized: boolean;
	readonly togglePanel: () => void;
	readonly restart: () => void;
	readonly setRestartFn: (fn: RestartFn) => void;
	readonly codeDrawerOpen: boolean;
	readonly selectedCode: string;
	readonly selectedFileName: string;
	readonly toggleCodeDrawer: () => void;
	readonly setCodeDrawerCode: (code: string, fileName: string) => void;
	readonly setCodeDrawerOpen: (open: boolean) => void;
	readonly hasCode: boolean;
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined);

interface PanelProviderProps {
	readonly children: ReactNode;
	readonly componentCode?: string;
	readonly componentFileName?: string;
	readonly exampleCode?: string;
	readonly exampleFileName?: string;
}

export function PanelProvider({
	children,
	componentCode,
	componentFileName,
	exampleCode,
	exampleFileName,
}: PanelProviderProps): React.ReactElement {
	const [isMaximized, setIsMaximized] = useState<boolean>(true);
	const restartRef = useRef<RestartFn | undefined>(undefined);
	const [codeDrawerOpen, setCodeDrawerOpen] = useState<boolean>(false);
	const [selectedCode, setSelectedCode] = useState<string>('');
	const [selectedFileName, setSelectedFileName] = useState<string>('');

	const hasCode: boolean = Boolean(componentCode || exampleCode);

	// Auto-minimize when code drawer opens
	useEffect((): void => {
		if (codeDrawerOpen) {
			setIsMaximized(true);
		}
	}, [codeDrawerOpen]);

	const togglePanel = useCallback((): void => {
		setIsMaximized((prev: boolean) => !prev);
	}, []);

	const restart = useCallback((): void => {
		restartRef.current?.();
	}, []);

	const setRestartFn = useCallback((fn: RestartFn): void => {
		restartRef.current = fn;
	}, []);

	const toggleCodeDrawer = useCallback((): void => {
		if (codeDrawerOpen) {
			setCodeDrawerOpen(false);
		} else {
			if (componentCode) {
				setSelectedCode(componentCode);
				setSelectedFileName(componentFileName ?? 'component.tsx');
			} else if (exampleCode) {
				setSelectedCode(exampleCode);
				setSelectedFileName(exampleFileName ?? 'example.tsx');
			}
			setCodeDrawerOpen(true);
		}
	}, [codeDrawerOpen, componentCode, componentFileName, exampleCode, exampleFileName]);

	const setCodeDrawerCode = useCallback((code: string, fileName: string): void => {
		setSelectedCode(code);
		setSelectedFileName(fileName);
	}, []);

	const value: PanelContextValue = useMemo(
		() => ({
			isMaximized,
			togglePanel,
			restart,
			setRestartFn,
			codeDrawerOpen,
			selectedCode,
			selectedFileName,
			toggleCodeDrawer,
			setCodeDrawerCode,
			setCodeDrawerOpen,
			hasCode,
		}),
		[
			isMaximized,
			togglePanel,
			restart,
			setRestartFn,
			codeDrawerOpen,
			selectedCode,
			selectedFileName,
			toggleCodeDrawer,
			setCodeDrawerCode,
			hasCode,
		]
	);

	return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanel(): PanelContextValue {
	const context: PanelContextValue | undefined = useContext(PanelContext);
	if (context === undefined) {
		throw new Error('usePanel must be used within a PanelProvider');
	}
	return context;
}
