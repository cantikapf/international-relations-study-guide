import React, { useState } from 'react'
import * as classes from '../styles/matrix.module.sass'

const TheoryMatrix = () => {
    const theories = [
        {
            name: 'Realism',
            actors: 'States',
            humanNature: 'Selfish / Flawed',
            system: 'Anarchic, zero-sum game',
            coreFocus: 'Power, Security, Survival'
        },
        {
            name: 'Liberalism',
            actors: 'States, IOs, NGOs, Corporations',
            humanNature: 'Basically good, capable of cooperation',
            system: 'Anarchic but mitigated by institutions',
            coreFocus: 'Cooperation, Interdependence, Peace'
        },
        {
            name: 'Constructivism',
            actors: 'Individuals, NGOs, States',
            humanNature: 'Socially constructed',
            system: 'Anarchy is what states make of it',
            coreFocus: 'Ideas, Identities, Norms'
        },
        {
            name: 'Marxism',
            actors: 'Classes (Capitalist vs Proletariat)',
            humanNature: 'Shaped by economic conditions',
            system: 'Hierarchical (Core, Periphery)',
            coreFocus: 'Economic inequality, Exploitation'
        }
    ]

    return (
        <div className={classes.matrixContainer}>
            <h3 className={classes.title}>Perbandingan Teori Hubungan Internasional</h3>
            <div className={classes.tableWrapper}>
                <table className={classes.theoryTable}>
                    <thead>
                        <tr>
                            <th>Teori</th>
                            <th>Aktor Utama</th>
                            <th>Sifat Dasar Manusia</th>
                            <th>Sistem Internasional</th>
                            <th>Fokus Utama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theories.map((theory, index) => (
                            <tr key={index}>
                                <td><strong>{theory.name}</strong></td>
                                <td>{theory.actors}</td>
                                <td>{theory.humanNature}</td>
                                <td>{theory.system}</td>
                                <td>{theory.coreFocus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TheoryMatrix
