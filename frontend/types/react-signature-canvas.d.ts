declare module 'react-signature-canvas' {
    import React from 'react';

    export interface SignatureCanvasProps {
        penColor?: string;
        canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
        backgroundColor?: string;
        clearOnResize?: boolean;
        ref?: React.Ref<SignatureCanvasRef>;
        onEnd?: () => void;
    }

    export interface SignatureCanvasRef {
        toDataURL: (type?: string, encoderOptions?: number | undefined) => string;
        clear: () => void;
        getTrimmedCanvas: () => HTMLCanvasElement;
    }

    const SignatureCanvas: React.ForwardRefExoticComponent<
        SignatureCanvasProps & React.RefAttributes<SignatureCanvasRef>
    >;

    export default SignatureCanvas;
}