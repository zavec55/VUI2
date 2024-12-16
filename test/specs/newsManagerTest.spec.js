describe('Mobilna aplikacija - Upravljanje novic', () => {
    it('Stran se pravilno naloži', async () => {
        console.log('Začetek testa: nalaganje strani');
        await browser.url('/home.html'); // Relativna pot, baseUrl se avtomatsko doda
        console.log('Stran se je naložila');
        
        const naslov = await $('h1'); // Poišče naslov na strani
        const naslovText = await naslov.getText(); // Pridobi besedilo naslova
        console.log(`Naslov strani: ${naslovText}`);
        
        // Preveri, če je naslov pravilen
        expect(naslovText).toBe('Upravljanje novic');
        console.log('Test uspešno opravljen.');
    });
    
    /**
     * Test 2: Dodajanje nove novice
     */
    it('Uspešno dodajanje nove novice', async () => {
        await browser.url('/home.html');

        const naslovInput = await $('#news-title'); // Polje za naslov novice
        const vsebinaInput = await $('#news-content'); // Polje za vsebino novice
        const slikaInput = await $('#news-image'); // Polje za URL slike novice
        const submitButton = await $('button[type="submit"]'); // Gumb za dodajanje novice

        // Vnos podatkov
        await naslovInput.setValue('Mobilna testna novica');
        await vsebinaInput.setValue('To je vsebina mobilne testne novice.');
        await slikaInput.setValue('https://example.com/image.jpg');
        await submitButton.click(); // Klik na gumb za dodajanje novice

        // Preverjanje, ali je novica dodana
        const dodanaNovica = await $('td=Mobilna testna novica');
        expect(await dodanaNovica.isDisplayed()).toBe(true);
    });

    /**
     * Test 3: Brisanje novice
     */
    it('Uspešno brisanje novice', async () => {
        await browser.url('/home.html');

        const deleteButton = await $('button=Izbriši'); // Poišče gumb za brisanje
        await deleteButton.click(); // Klik na gumb za brisanje novice

        const confirmButton = await $('#confirm-delete-button'); // Gumb za potrditev brisanja
        await confirmButton.click(); // Potrditev brisanja

        // Preverjanje, ali je novica izbrisana
        const izbrisanaNovica = await $('td=Mobilna testna novica');
        expect(await izbrisanaNovica.isExisting()).toBe(false);
    });
});
