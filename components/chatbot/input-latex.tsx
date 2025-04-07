// 'use client';

// // Define the MathFieldElement interface first
// interface MathFieldElement extends HTMLElement {
//   value: string;
//   mathVirtualKeyboardPolicy: string;
// }

// // Then use it in the JSX namespace declaration
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, MathFieldElement>;
//     }
//   }
// }

// import { useEffect, useRef, useState } from 'react';
// import 'mathlive';
// import { useLatexStore } from '@/store/latexStore';
// import { Keyboard } from 'lucide-react';
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// interface InputLatexProps {
//   importToMain: () => void;
// }

// export default function InputLatex({ importToMain }: InputLatexProps) {
//   const mf = useRef<MathFieldElement | null>(null);
//   const { setLatexValue } = useLatexStore();
//   const [showMathField, setShowMathField] = useState(false); // Toggle state
//   const [isOpen, setIsOpen] = useState(false);
  
//   useEffect(() => {
//     const loadMathfield = async () => {
//       try {
//         await import('mathlive');
//       } catch (error) {
//         console.error('Failed to load MathLive:', error);
//       }
//     };
//     loadMathfield();
//   }, []);

//   useEffect(() => {
//     if (mf.current) {
//       mf.current.mathVirtualKeyboardPolicy = 'manual';

//       const handleFocusIn = () => {
//         (window as any)?.mathVirtualKeyboard?.show();
//       };

//       const handleFocusOut = () => {
//         (window as any)?.mathVirtualKeyboard?.hide();
//       };

//       mf.current.addEventListener('focusin', handleFocusIn);
//       mf.current.addEventListener('focusout', handleFocusOut);

//       return () => {
//         mf.current?.removeEventListener('focusin', handleFocusIn);
//         mf.current?.removeEventListener('focusout', handleFocusOut);
//       };
//     }
//   }, []);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
//       <DialogTrigger>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div>
//               <div className='hidden mr-2 border p-2 rounded-full md:flex justify-center items-center gap-1'>
//                 <p className="text-xs text-gray-400">Nhập công thức</p>
//                 <Keyboard size={16} onClick={() => setShowMathField(prev => !prev)} />
//               </div>
//               <div className='md:hidden flex p-2 rounded-full'>
//                 <Keyboard size={16} onClick={() => setShowMathField(prev => !prev)} />
//               </div>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent sideOffset={12}>Mở công thức</TooltipContent>
//         </Tooltip>
//       </DialogTrigger>
//       <DialogContent onPointerDownOutside={(e) => {
//         e.preventDefault();
//       }}>
//         <DialogHeader>
//           <DialogTitle>Nhập công thức</DialogTitle>
//           <DialogDescription aria-describedby="description9">
//             <math-field
//               ref={mf as React.RefObject<HTMLElement>}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               onInput={(evt: Event) => {
//                 const target = evt.target as MathFieldElement;
//                 setLatexValue(target.value);
//               }}
//             />
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <button
//             onClick={() => {
//               importToMain();
//               if (mf.current) {
//                 mf.current.value = '';
//               }
//               setIsOpen(false);
//             }}
//             className="md:text-lg px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-sm shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
//           >
//             Thêm vào đoạn chat
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }