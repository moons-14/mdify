import { useEffect, useState } from 'react'
import { htmlToMarkdown } from "webforai";
import { AppHeader } from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { copy } from './utils/copy';
import { useToast } from '@/components/ui/use-toast';
import CustomMarkdownRenderer from '@/components/markdown/customMarkdownRenderer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';


function App() {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [markdown, setMarkdown] = useState<string>('')

  const { toast } = useToast();

  const updateMarkdown = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      console.log(activeTab.title)
      if (activeTab.id) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: () => document.documentElement.outerHTML
        }, (result) => {
          if (result && result[0] && result[0].result) {
            setTitle(activeTab.title || '')
            setUrl(activeTab.url || '')
            setMarkdown(htmlToMarkdown(result[0].result))
          }
        })
      }
    })
  }

  const updateTab = () => {
    updateMarkdown()
  }

  useEffect(() => {
    chrome.tabs.onActivated.addListener(updateTab)
    chrome.tabs.onUpdated.addListener(updateTab)

    updateMarkdown()

    return () => {
      chrome.tabs.onActivated.removeListener(updateTab)
      chrome.tabs.onUpdated.removeListener(updateTab)
    }
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <div className='px-4'>
        <div className="space-y-1 py-4">
          <h2 className="text-2xl font-bold tracking-tight truncate cursor-pointer"
            onClick={() => {
              copy(title)
              toast({
                title: "Copied to clipboard",
                description: title
              })
            }}
          >{title}
          </h2>
          <p className="truncate cursor-pointer"
            onClick={() => {
              copy(url)
              toast({
                title: "Copied to clipboard",
                description: url
              })
            }}
          >URL: {url}
          </p>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="preview">Preview Markdown</TabsTrigger>
            <TabsTrigger className="w-full" value="raw">Raw Data</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className='w-full'>
            <CustomMarkdownRenderer markdown={markdown}></CustomMarkdownRenderer>
          </TabsContent>
          <TabsContent value="raw" className='w-full'>
            <div className='flex justify-between items-center'>
              <h2 className='my-4 text-lg'>Markdown</h2>
              <Button size="sm" variant="outline" className="space-x-2"
                onClick={() => {
                  copy(markdown)
                  toast({
                    title: "Copied to clipboard",
                    description: markdown.slice(0, 50) + "..."
                  })
                }}
              >
                <Clipboard size={18} />
                <span>
                  Copy
                </span>
              </Button>
            </div>
            <SyntaxHighlighter language="markdown" style={vscDarkPlus} className="w-full">
              {markdown}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App