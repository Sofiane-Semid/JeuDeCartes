using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Models.Data;
using Models.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Super_Cartes_Infinies.Controllers
{
    [Authorize(Roles = ApplicationDbContext.ADMIN_ROLE)]
    public class CarteDepartsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CarteDepartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CarteDeparts
        public async Task<IActionResult> Index()
        {
            return View(await _context.CarteDeparts.OrderBy(c => c.Carte).ToListAsync());
        }

       

        // GET: CarteDeparts/Create
        public IActionResult Create()
        {
            var model = new CarteDepart();

            model.CartesDisponibles = _context.Cards.ToList();

            return View(model);
        }

        // POST: CarteDeparts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Carte,ImageUrl,rarete")] CarteDepart carteDepart)
        {
            var carte = _context.Cards
                .FirstOrDefault(c => c.Name == carteDepart.Carte);

            if (ModelState.IsValid)
            {
                carteDepart.ImageUrl = carte.ImageUrl;
                _context.Add(carteDepart);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            carteDepart.CartesDisponibles = _context.Cards.ToList();
            return View(carteDepart);
        }

        // GET: CarteDeparts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var carteDepart = await _context.CarteDeparts.FindAsync(id);
            if (carteDepart == null)
            {
                return NotFound();
            }
            var model = new CarteDepart();

            model.CartesDisponibles = _context.Cards.ToList();
            return View(model);
        }

        // POST: CarteDeparts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Carte,ImageUrl,rarete")] CarteDepart carteDepart)
        {
            var carte = _context.Cards
               .FirstOrDefault(c => c.Name == carteDepart.Carte);
            if (id != carteDepart.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    carteDepart.ImageUrl = carte.ImageUrl;
                    _context.Update(carteDepart);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CarteDepartExists(carteDepart.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(carteDepart);
        }

        // GET: CarteDeparts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var carteDepart = await _context.CarteDeparts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (carteDepart == null)
            {
                return NotFound();
            }

            return View(carteDepart);
        }

        // POST: CarteDeparts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var carteDepart = await _context.CarteDeparts.FindAsync(id);
            if (carteDepart != null)
            {
                _context.CarteDeparts.Remove(carteDepart);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CarteDepartExists(int id)
        {
            return _context.CarteDeparts.Any(e => e.Id == id);
        }
    }
}
