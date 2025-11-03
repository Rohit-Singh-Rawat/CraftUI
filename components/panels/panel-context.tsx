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

export interface CodeFile {
	code: string;
	fileName: string;
	language?: string;
}

interface PanelContextValue {
	readonly isMaximized: boolean;
	readonly togglePanel: () => void;
	readonly restart: () => void;
	readonly setRestartFn: (fn: RestartFn) => void;
	readonly codeDrawerOpen: boolean;
	readonly codeFiles: CodeFile[];
	readonly selectedFileIndex: number;
	readonly toggleCodeDrawer: () => void;
	readonly setCodeDrawerFiles: (files: CodeFile[]) => void;
	readonly setSelectedFileIndex: (index: number) => void;
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
	readonly additionalFiles?: CodeFile[];
}

export function PanelProvider({
	children,
	componentCode,
	componentFileName,
	exampleCode,
	exampleFileName,
	additionalFiles = [],
}: PanelProviderProps): React.ReactElement {
	const [isMaximized, setIsMaximized] = useState<boolean>(true);
	const restartRef = useRef<RestartFn | undefined>(undefined);
	const [codeDrawerOpen, setCodeDrawerOpen] = useState<boolean>(false);
	const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
	const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);

	const hasCode: boolean = Boolean(componentCode || exampleCode || additionalFiles.length > 0);

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
			const files: CodeFile[] = [];

			// Helper to extract just filename from path
			const getFileName = (path: string | undefined, defaultName: string): string => {
				if (!path) return defaultName;
				return path.split('/').pop() || path.split('\\').pop() || defaultName;
			};

			if (componentCode) {
				files.push({
					code: componentCode,
					fileName: getFileName(componentFileName, 'component.tsx'),
					language: 'typescript',
				});
			}

			if (exampleCode) {
				files.push({
					code: exampleCode,
					fileName: getFileName(exampleFileName, 'example.tsx'),
					language: 'typescript',
				});
			}

			if (additionalFiles.length > 0) {
				files.push(...additionalFiles);
			}

			if (files.length > 0) {
				setCodeFiles(files);
				setSelectedFileIndex(0);
				setCodeDrawerOpen(true);
			}
		}
	}, [
		codeDrawerOpen,
		componentCode,
		componentFileName,
		exampleCode,
		exampleFileName,
		additionalFiles,
	]);

	const setCodeDrawerFiles = useCallback((files: CodeFile[]): void => {
		setCodeFiles(files);
		setSelectedFileIndex(0);
	}, []);

	const value: PanelContextValue = useMemo(
		() => ({
			isMaximized,
			togglePanel,
			restart,
			setRestartFn,
			codeDrawerOpen,
			codeFiles,
			selectedFileIndex,
			toggleCodeDrawer,
			setCodeDrawerFiles,
			setSelectedFileIndex,
			setCodeDrawerOpen,
			hasCode,
		}),
		[
			isMaximized,
			togglePanel,
			restart,
			setRestartFn,
			codeDrawerOpen,
			codeFiles,
			selectedFileIndex,
			toggleCodeDrawer,
			setCodeDrawerFiles,
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
