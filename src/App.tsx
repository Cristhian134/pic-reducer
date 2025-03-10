import { ImagesProvider } from "./contexts/images";
import { SettingsProvider } from "./contexts/settings";
import { UploadImage } from "./components/shared/uploadImage/uploadImage";
import { CompressOption } from "./components/shared/compressOption/compressOption";
import { CompressedImages } from "./components/shared/processedFile/compressedImages";
import { Header } from "./components/shared/header";
import { Footer } from "./components/shared/footer";

function App() {
  return (
    <div className="absolute top-0 bg-neutral-50 w-full box-border flex items-center justify-start flex-col gap-3">
      <SettingsProvider>
        <Header />
        <ImagesProvider>
          <section className="w-full">
            <div className="gap-2 layout xl:px-60 lg:px-16 md:px-5 px-3">
              <UploadImage />
              <CompressOption />
              <CompressedImages />
            </div>
          </section>
        </ImagesProvider>
      </SettingsProvider>
      <Footer />
    </div>
  );
}

export default App;
