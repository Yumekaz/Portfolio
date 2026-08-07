/**
 * Footer — dark footer with contact links.
 */
export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-12 border-t border-black bg-black text-white p-8 font-mono text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="uppercase tracking-widest text-gray-500 text-xs mb-4">
            Secure Handshake
          </div>
          <div className="space-y-2">
            <div className="flex gap-4 items-center">
              <span className="text-orange-600">email</span>
              <a
                href="mailto:mihir.swarnkar722@gmail.com?subject=Portfolio%20Inquiry"
                className="hover:underline"
              >
                mihir.swarnkar722@gmail.com
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-orange-600">github</span>
              <a
                href="https://github.com/Yumekaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @Yumekaz
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-orange-600">linkedin</span>
              <a
                href="https://www.linkedin.com/in/mihirswarnkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                in/mihirswarnkar
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-orange-600">resume</span>
              <a href="/Portfolio/resume.pdf" download className="hover:underline">
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end items-start md:items-end">
          <div className="text-right">
            <div className="inline-block border border-gray-700 px-3 py-1 text-xs">
              NO TRACKING. NO ANALYTICS.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
