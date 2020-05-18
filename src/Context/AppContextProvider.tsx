import React, { Component } from 'react';
import AppContext from './AppContext';
import Unsplash from './../Unsplash';
import htmlToImage from 'html-to-image';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

class AppContextProvider extends Component {
    state = {
        editModeOn: true,
        photoSearchPage: 1,
        currentImage: 0,
        photoSearchResults: [],
        currentPalette: {},
        currentFonts: [],
        currentFontsIndex: 0,
        isDownloading: false,
        fetchingError: false,
        downloadingError: false
    }

    componentDidMount() {
        const {photoSearchPage} = this.state;
        this.getUnsplashImages(photoSearchPage); 
        this.animateImage();
    }

    getUnsplashImages = (photoSearchPage: Number) => {
        return Unsplash.search.photos('christmas', photoSearchPage, 5)
        .then((data: any) => data.json())
        .then((data: any) => {
            this.setState(
                {photoSearchResults: 
                    [...this.state.photoSearchResults, 
                        ...data.results.map((d: any) => d.urls)]})
            })
        .catch((err: string) => {
            console.error(err)
            this.setState({fetchingError: true})
        });
    }

    enableEdit = () => {
        this.setState({editModeOn: true});
    }

    disableEdit = () => {
        this.setState({editModeOn: false});
    }

    toggleImage = () => {
        this.setState({fetchingError: false});
        this.showImageLoader();
        if (this.state.currentImage === (4 * this.state.photoSearchPage)) {
            this.getUnsplashImages(this.state.photoSearchPage + 1)
            .then(() => {
                this.setState({
                    currentImage: this.state.currentImage + 1,
                    photoSearchPage: this.state.photoSearchPage + 1
                });
                this.hideImageLoader();
                this.animateImage();
            })
            .catch((err: string) => {
                console.error(err)
                this.setState({fetchingError: true})
            });
        } else {
            this.showImageLoader();
            this.setState({
                currentImage: (this.state.currentImage + 1)
            });
            this.hideImageLoader();
            this.animateImage();
        }
    }

    getPreviousImage = () => {
        this.showImageLoader();
        if (this.state.currentImage >= 1) this.setState({
                currentImage: (this.state.currentImage - 1)
            })
        this.hideImageLoader();
        this.animateImage();        
    }

    setPalette = (palette: Object) => {
        this.setState({currentPalette: palette});
    }

    setFonts = (headingFont: string, textFont: string) => {
        this.setState({currentFonts: [headingFont, textFont]});
    }

    incrementCurrentFontsIndex = () => {
        this.setState({currentFontsIndex: this.state.currentFontsIndex + 1})
    }

    decrementCurrentFontsIndex = () => {
        this.setState({currentFontsIndex: this.state.currentFontsIndex - 1})
    }

    showImageLoader = () => {
        const imageLoader = (document.querySelector('.image-loader') as HTMLElement);
        imageLoader.style.display = 'block';
    }

    hideImageLoader = () => {
        const imageLoader = (document.querySelector('.image-loader') as HTMLElement);
        imageLoader.style.display = 'none';
    }

    animateImage = () => {
        const cardImage = (document.querySelector('.card-image') as HTMLElement);
        cardImage.classList.remove('animate');
        void cardImage.offsetWidth;
        cardImage.classList.add('animate');
    }

    uploadImage = (e: HTMLInputEvent) => {
        if (!e.target) return;

        const input = e.target;
        const reader = new FileReader();
        this.showImageLoader();
        reader.onload = () => {
            const dataURL = reader.result;
            const output = (document.querySelector('.card-image') as HTMLElement);
            output.style.backgroundImage = `url(${dataURL})`;
            this.hideImageLoader();
            this.animateImage();
        };
        ;
        reader.readAsDataURL((input.files as FileList)[0]);
    }

    downloadCard = () => {
        this.setState({downloadingError: false});
        this.setState({isDownloading: true});
        this.disableEdit();
        const card = (document.querySelector('.card-wrapper') as HTMLElement)
        htmlToImage.toJpeg(card, { quality: 1 })
            .then((dataUrl: string) => {
                const link = document.createElement('a');
                link.download = 'my-christmas-card.jpeg';
                link.href = dataUrl;
                link.click();
            })
            .then(() => {
                this.setState({isDownloading: false});
                this.enableEdit();
            })
            .catch((err: string) => {
                console.error(err);
                this.setState({downloadingError: true});
            });
    }

    render() {
        return (
            <AppContext.Provider value={{
                editModeOn: this.state.editModeOn,
                photoSearchResults: this.state.photoSearchResults,
                currentImage: this.state.currentImage,
                toggleImage: this.toggleImage,
                getPreviousImage: this.getPreviousImage,
                currentPalette: this.state.currentPalette,
                currentFonts: this.state.currentFonts,
                currentFontsIndex: this.state.currentFontsIndex,
                incrementCurrentFontsIndex: this.incrementCurrentFontsIndex,
                decrementCurrentFontsIndex: this.decrementCurrentFontsIndex,
                setPalette: this.setPalette,
                setFonts: this.setFonts,
                enableEdit: this.enableEdit,
                disableEdit: this.disableEdit,
                animateImage: this.animateImage,
                uploadImage: this.uploadImage,
                isDownloading: this.state.isDownloading,
                downloadCard: this.downloadCard,
                fetchingError: this.state.fetchingError,
                downloadingError: this.state.downloadingError
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppContextProvider;