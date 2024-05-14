describe('Notetaking App Features', () => {
    beforeAll(async () => {
        await page.goto('https://elaine-ch.github.io/CSE110-SP24-Lab6-Template/'); 
    });
  
    it('Add new note', async () => {
      const initialNoteCount = await page.$$eval('.note', notes => notes.length);
      await page.click('.add-note');
      const updatedNoteCount = await page.$$eval('.note', notes => notes.length);
      expect(updatedNoteCount).toBe(initialNoteCount + 1);
    });
  
    it('Edit new note', async () => {
      await page.type('.note', 'New Note');
      const editedNoteText = await page.$eval('.note', note => note.value);
      expect(editedNoteText).toBe('New Note');
      await page.keyboard.press('Tab');
    });
  
    it('Edit existing note', async () => {
      // Simulate editing an existing note
      await page.click('.note');
      await page.type('.note', ', Edited Note');
      const editedNoteText = await page.$eval('.note', note => note.value);
      expect(editedNoteText).toBe('New Note, Edited Note');
      await page.keyboard.press('Tab');
    });
  
    it('Notes are saved locally', async () => {
      // Refresh the page and check if notes are still present
      await page.reload();
      const noteCount = await page.$$eval('.note', notes => notes.length);
      expect(noteCount).toBeGreaterThan(0);
    });
  
    it('Delete note by double clicking on note', async () => {
      // Simulate double clicking on a note to delete it
      //await page.waitForSelector('.note');
      //await page.click('.note', { clickCount: 2 });
      await page.click('.note', { clickCount: 2 }); // Double click
      const noteCount = await page.$$eval('.note', notes => notes.length);
      expect(noteCount).toBe(0);
    });
  });