// const handleCorrect = async () => {
//        const selection = editor.getSelection();
//        const blockToCorrect = selection ? selection.blocks : [editor.getTextCursorPosition().block];
//
//        if(!settings?.api.apiKey) return;
//        setIsLoading(true);
//
//        try {
//            const markdownText = await editor.blocksToMarkdownLossy(blockToCorrect);
//            const prompt = `Corrige l'orthographe de ce texte. 
//                Règle ABSOLUE : Tu dois conserver exactement le même formatage Markdown (**, _, liens, etc.). 
//                Ne renvoie QUE le texte corrigé, sans introduction.\n\n${markdownText}`;
//
//            const correctedMarkdown = await generateTextWithAI(prompt, settings.api.apiKey);
//            const newJsonBlocks = await editor.tryParseMarkdownToBlocks(correctedMarkdown);
//            
//            if(selection) {
//                editor.replaceBlocks(blockToCorrect, newJsonBlocks);
//            } else {
//            editor.replaceBlocks([editor.getTextCursorPosition().block], newJsonBlocks);
//            }
//        } catch (error) {
//            const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue s'est produite";
//            toast.add({type: "error", title: "Une erreur est survenue", description: errorMessage})
//        } finally {
//            setIsLoading(false);
//        }
//    }