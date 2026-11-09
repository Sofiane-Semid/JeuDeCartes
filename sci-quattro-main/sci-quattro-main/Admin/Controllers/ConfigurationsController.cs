using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models.Data;
using Models.Models;

namespace Super_Cartes_Infinies.Controllers
{
    [Authorize(Roles = ApplicationDbContext.ADMIN_ROLE)]
    public class ConfigurationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ConfigurationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Configurations
        public async Task<IActionResult> Index()
        {
            return View(await _context.Configuration.ToListAsync());
        }

       

        // GET: Configurations/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Configurations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,NbCardsApiger,ManaParTour,CoinsOnRegister,CoinsOnWin,CoinsOnLose")] Configurations configurations)
        {
            if (ModelState.IsValid)
            {
                _context.Add(configurations);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(configurations);
        }

        // GET: Configurations/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var configurations = await _context.Configuration.FindAsync(id);
            if (configurations == null)
            {
                return NotFound();
            }
            return View(configurations);
        }

        // POST: Configurations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,NbCardsApiger,ManaParTour,MaxDeckParJoueur,MaxCartesParDeck,CoinsOnRegister,CoinsOnWin,CoinsOnLose")] Configurations configurations)
        {
            if (id != configurations.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(configurations);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ConfigurationsExists(configurations.Id))
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
            return View(configurations);
        }

        // GET: Configurations/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var configurations = await _context.Configuration
                .FirstOrDefaultAsync(m => m.Id == id);
            if (configurations == null)
            {
                return NotFound();
            }

            return View(configurations);
        }

        // POST: Configurations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var configurations = await _context.Configuration.FindAsync(id);
            if (configurations != null)
            {
                _context.Configuration.Remove(configurations);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ConfigurationsExists(int id)
        {
            return _context.Configuration.Any(e => e.Id == id);
        }
    }
}
